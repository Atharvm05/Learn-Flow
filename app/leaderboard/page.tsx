import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  const { data: topStats } = await supabase
    .from("user_stats")
    .select("user_id, total_xp, current_level")
    .order("total_xp", { ascending: false })
    .limit(50)

  const { data: profiles } = await supabase.from("profiles").select("id, first_name")

  // Create a map of profiles for quick lookup
  const profileMap = new Map(profiles?.map((p) => [p.id, p]) || [])

  // Combine stats with profiles in application
  const topUsers =
    topStats?.map((stat) => ({
      ...stat,
      profiles: profileMap.get(stat.user_id) || { first_name: "Unknown User" },
    })) || []

  const { data: userStats } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userData.user.id)
    .maybeSingle()

  const userRank = topUsers?.findIndex((u) => u.user_id === userData.user.id) || -1

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={userData.user} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">LearnFlow Leaderboard</h1>

        {/* User Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Your Rank</p>
            <p className="text-4xl font-bold text-cyan-400">{userRank + 1}</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Your XP</p>
            <p className="text-4xl font-bold text-emerald-400">{userStats?.total_xp || 0}</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <p className="text-slate-400 text-sm mb-2">Your Level</p>
            <p className="text-4xl font-bold text-yellow-400">{userStats?.current_level || 1}</p>
          </div>
        </div>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Top</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Leaderboard users={topUsers || []} currentUserId={userData.user.id} />
          </TabsContent>

          <TabsContent value="weekly">
            <div className="text-center py-12 text-slate-400">Coming soon: Weekly rankings updated every Monday</div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="text-center py-12 text-slate-400">Coming soon: Rankings by skill category</div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
