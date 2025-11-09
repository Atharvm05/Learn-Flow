import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { BadgesCollection } from "@/components/gamification/badges-collection"

export default async function BadgesPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  // Get all badges
  const { data: allBadges } = await supabase.from("badges").select("*")

  // Get user badges
  const { data: userBadges } = await supabase.from("user_badges").select("badge_id").eq("user_id", userData.user.id)

  const earnedBadgeIds = userBadges?.map((b) => b.badge_id) || []

  const { data: userStats } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userData.user.id)
    .maybeSingle()

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={userData.user} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Badges & Achievements</h1>
        <p className="text-slate-400 mb-12">
          Earn badges by completing courses, maintaining streaks, and helping others
        </p>

        <BadgesCollection badges={allBadges || []} earnedBadgeIds={earnedBadgeIds} userStats={userStats} />
      </main>
    </div>
  )
}
