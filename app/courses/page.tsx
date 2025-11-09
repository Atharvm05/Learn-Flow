import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { CourseGrid } from "@/components/dashboard/course-grid"
import { Input } from "@/components/ui/input"

export default async function CoursesPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={data.user} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-8">All Courses</h1>
          <div className="flex gap-4">
            <Input
              placeholder="Search courses..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 max-w-md"
            />
          </div>
        </div>

        {/* Course Grid */}
        <CourseGrid />
      </main>
    </div>
  )
}
