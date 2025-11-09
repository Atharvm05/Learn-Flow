import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { AdminStats } from "@/components/admin/admin-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseManager } from "@/components/admin/course-manager"
import { SkillsManager } from "@/components/admin/skills-manager"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  // Check if user is mentor/admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", userData.user.id).single()

  if (profile?.role !== "mentor") {
    redirect("/dashboard")
  }

  // Get admin stats
  const { data: coursesData } = await supabase.from("courses").select("id").eq("instructor_id", userData.user.id)

  const { data: studentsData } = await supabase
    .from("enrollments")
    .select("user_id", { count: "exact" })
    .in("course_id", coursesData?.map((c) => c.id) || [])

  const { data: allCourses } = await supabase.from("courses").select("*")

  const { data: allSkills } = await supabase.from("skills").select("*")

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={userData.user} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Admin Stats */}
        <AdminStats coursesCount={coursesData?.length || 0} studentsCount={studentsData?.length || 0} />

        {/* Admin Tabs */}
        <Tabs defaultValue="courses" className="w-full mt-12">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="courses">Manage Courses</TabsTrigger>
            <TabsTrigger value="skills">Manage Skills</TabsTrigger>
            <TabsTrigger value="content">Content Library</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6">
            <CourseManager courses={allCourses || []} instructorId={userData.user.id} />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <SkillsManager skills={allSkills || []} />
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-12 text-center">
              <p className="text-slate-400">Content library features coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
