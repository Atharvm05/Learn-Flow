import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  const { data: course, error: courseError } = await supabase.from("courses").select("*").eq("id", params.id).single()

  if (courseError || !course) {
    redirect("/courses")
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", params.id)
    .order("order_index", { ascending: true })

  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", userData.user.id)
    .eq("course_id", params.id)
    .single()

  const handleEnroll = async () => {
    await supabase.from("enrollments").insert({
      user_id: userData.user.id,
      course_id: params.id,
    })
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={userData.user} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/courses" className="text-cyan-400 hover:text-cyan-300 text-sm mb-4 inline-block">
            ← Back to Courses
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
          <p className="text-slate-400 mb-6">{course.description}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className="bg-emerald-900 text-emerald-200">{course.difficulty_level}</Badge>
            <span className="text-slate-300">⏱️ {course.duration_hours}h</span>
            <span className="text-slate-300">🎯 {course.xp_reward} XP</span>
            <span className="text-slate-300">👥 {course.students_enrolled} students</span>
          </div>

          {!enrollment && (
            <form action={handleEnroll}>
              <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600">
                Enroll Now
              </Button>
            </form>
          )}
          {enrollment && (
            <Button disabled className="bg-slate-700">
              Already Enrolled
            </Button>
          )}
        </div>

        {/* Lessons */}
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-white">Course Content</CardTitle>
            <CardDescription className="text-slate-400">{lessons?.length || 0} lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lessons?.map((lesson: any) => (
                <div key={lesson.id} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                  <h3 className="text-white font-medium">{lesson.title}</h3>
                  <p className="text-slate-400 text-sm">{lesson.description}</p>
                  <span className="text-slate-500 text-xs">⏱️ {lesson.duration_minutes}m</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
