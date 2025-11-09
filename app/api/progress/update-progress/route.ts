import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { lessonId, courseId } = await request.json()

    // Record lesson completion
    await supabase.from("lesson_completions").insert({
      user_id: userData.user.id,
      lesson_id: lessonId,
    })

    // Get enrollment
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("course_id", courseId)
      .single()

    // Calculate new progress
    const { data: completions } = await supabase
      .from("lesson_completions")
      .select("lesson_id")
      .eq("user_id", userData.user.id)

    const { data: lessons } = await supabase.from("lessons").select("id").eq("course_id", courseId)

    const progressPercent = lessons?.length ? Math.round(((completions?.length || 0) / lessons.length) * 100) : 0

    // Update enrollment progress
    await supabase.from("enrollments").update({ progress_percent: progressPercent }).eq("id", enrollment?.id)

    // Get course info for XP
    const { data: course } = await supabase.from("courses").select("xp_reward").eq("id", courseId).single()

    const { data: stats } = await supabase.from("user_stats").select("*").eq("user_id", userData.user.id).maybeSingle()

    if (stats) {
      const newXP = (stats.total_xp || 0) + (course?.xp_reward || 0)
      const newLevel = Math.floor(newXP / 500) + 1

      await supabase
        .from("user_stats")
        .update({
          total_xp: newXP,
          current_level: newLevel,
        })
        .eq("user_id", userData.user.id)
    }

    const today = new Date().toISOString().split("T")[0]
    const { data: streak } = await supabase
      .from("learning_streaks")
      .select("*")
      .eq("user_id", userData.user.id)
      .maybeSingle()

    if (streak) {
      const lastDate = streak.last_activity_date ? new Date(streak.last_activity_date) : null
      const today_date = new Date()
      let newStreak = streak.current_streak

      if (!lastDate || lastDate.toISOString().split("T")[0] !== today) {
        const dayDiff = lastDate ? Math.floor((today_date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)) : 0

        if (dayDiff === 1) {
          newStreak = streak.current_streak + 1
        } else if (dayDiff > 1) {
          newStreak = 1
        } else if (dayDiff === 0) {
          newStreak = streak.current_streak
        }

        await supabase
          .from("learning_streaks")
          .update({
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, streak.longest_streak),
            last_activity_date: today,
          })
          .eq("user_id", userData.user.id)
      }
    }

    return NextResponse.json({ success: true, progressPercent })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
