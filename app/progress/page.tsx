import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProgressStats } from "@/components/progress/progress-stats"
import { LearningStreak } from "@/components/progress/learning-streak"
import { EnrolledCourses } from "@/components/progress/enrolled-courses"

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  const { data: userStats } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userData.user.id)
    .maybeSingle()

  const { data: streak } = await supabase
    .from("learning_streaks")
    .select("*")
    .eq("user_id", userData.user.id)
    .maybeSingle()

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("user_id", userData.user.id)
    .order("enrolled_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={userData.user} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">My Learning Progress</h1>

        {/* Stats Grid */}
        <ProgressStats stats={userStats} />

        {/* Streak and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <LearningStreak streak={streak} />
          </div>
        </div>

        {/* Enrolled Courses */}
        <EnrolledCourses enrollments={enrollments || []} />
      </main>
    </div>
  )
}
