import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function GET() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get user's enrolled courses
    const { data: enrollments } = await supabase.from("enrollments").select("course_id").eq("user_id", userData.user.id)

    const enrolledCourseIds = enrollments?.map((e) => e.course_id) || []

    // Get user interests
    const { data: interests } = await supabase
      .from("user_interests")
      .select("skills(name)")
      .eq("user_id", userData.user.id)

    const userSkills = interests?.map((i) => (i.skills as any)?.name).join(", ") || "web development, learning"

    // Get user stats for context
    const { data: stats } = await supabase.from("user_stats").select("*").eq("user_id", userData.user.id).single()

    // Get courses not yet enrolled in
    const { data: availableCourses } = await supabase
      .from("courses")
      .select("id, title, description, difficulty_level, duration_hours")
      .eq("is_published", true)

    const coursesToRecommend = availableCourses?.filter((c) => !enrolledCourseIds.includes(c.id)) || []

    if (coursesToRecommend.length === 0) {
      return NextResponse.json({ recommendations: [] })
    }

    // Use AI to generate personalized recommendations
    const prompt = `You are an expert learning advisor. Based on the following user profile and available courses, recommend the top 3-5 most relevant courses for personalized learning.

User Skills/Interests: ${userSkills}
User Level: ${stats?.current_level || 1}
Total Hours Learned: ${stats?.total_hours_learned || 0}

Available Courses:
${coursesToRecommend
  .slice(0, 10)
  .map((c) => `- ${c.title} (${c.difficulty_level}, ${c.duration_hours}h): ${c.description}`)
  .join("\n")}

For each recommended course, provide:
1. Course title
2. Why it's recommended (one short sentence)
3. Relevance score (0-100)

Format as JSON array with objects containing: title, reason, score`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    // Parse AI response
    let recommendations = []
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0])
      }
    } catch (e) {
      console.error("Failed to parse AI recommendations:", e)
    }

    // Map recommendations to course IDs
    const recommendedCourses = recommendations
      .map((rec: any) => {
        const course = coursesToRecommend.find((c) => c.title.toLowerCase().includes(rec.title.toLowerCase()))
        return {
          course_id: course?.id,
          reason: rec.reason,
          relevance_score: rec.score / 100,
        }
      })
      .filter((r: any) => r.course_id)

    // Store recommendations
    for (const rec of recommendedCourses) {
      await supabase.from("recommendations").upsert({
        user_id: userData.user.id,
        course_id: rec.course_id,
        reason: rec.reason,
        relevance_score: rec.relevance_score,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
    }

    // Fetch full course details for response
    const { data: fullCourses } = await supabase
      .from("courses")
      .select("*")
      .in(
        "id",
        recommendedCourses.map((r) => r.course_id),
      )

    const result =
      fullCourses?.map((course) => {
        const rec = recommendedCourses.find((r) => r.course_id === course.id)
        return {
          ...course,
          reason: rec?.reason,
          relevance_score: rec?.relevance_score,
        }
      }) || []

    return NextResponse.json({ recommendations: result })
  } catch (error) {
    console.error("Recommendation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate recommendations" },
      { status: 500 },
    )
  }
}
