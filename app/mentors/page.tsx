import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MentorGrid } from "@/components/community/mentor-grid"
import { Input } from "@/components/ui/input"

export default async function MentorsPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  // Get mentors (users with mentor role and high reputation)
  const { data: mentors } = await supabase
    .from("profiles")
    .select("id, first_name, bio, user_stats(current_level, total_xp)")
    .eq("role", "mentor")
    .order("total_xp", { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={userData.user} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Find a Mentor</h1>
        <p className="text-slate-400 mb-8">Connect with experienced learners to accelerate your growth</p>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search mentors by name or skill..."
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 max-w-md"
          />
        </div>

        {/* Mentor Grid */}
        <MentorGrid mentors={mentors || []} currentUserId={userData.user.id} />
      </main>
    </div>
  )
}
