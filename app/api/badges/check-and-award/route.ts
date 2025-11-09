import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data: stats } = await supabase.from("user_stats").select("*").eq("user_id", userData.user.id).maybeSingle()

    // Get all badges
    const { data: badges } = await supabase.from("badges").select("*")

    // Get user's earned badges
    const { data: earnedBadges } = await supabase.from("user_badges").select("badge_id").eq("user_id", userData.user.id)

    const earnedBadgeIds = earnedBadges?.map((b) => b.badge_id) || []

    // Check which badges should be awarded
    const badgesToAward =
      badges?.filter((badge) => {
        if (earnedBadgeIds.includes(badge.id)) {
          return false // Already earned
        }

        switch (badge.requirement_type) {
          case "courses_completed":
            return (stats?.courses_completed || 0) >= badge.requirement_value
          case "streak_days":
            return (stats?.current_streak || 0) >= badge.requirement_value
          case "total_xp":
            return (stats?.total_xp || 0) >= badge.requirement_value
          case "level":
            return (stats?.current_level || 1) >= badge.requirement_value
          default:
            return false
        }
      }) || []

    // Award new badges
    for (const badge of badgesToAward) {
      await supabase.from("user_badges").insert({
        user_id: userData.user.id,
        badge_id: badge.id,
      })

      // Add achievement record
      await supabase.from("achievements").insert({
        user_id: userData.user.id,
        type: "badge",
        title: `Earned ${badge.name}`,
        description: badge.description,
        xp_earned: badge.xp_reward,
      })

      const { data: currentStats } = await supabase
        .from("user_stats")
        .select("total_xp")
        .eq("user_id", userData.user.id)
        .maybeSingle()

      await supabase
        .from("user_stats")
        .update({
          total_xp: (currentStats?.total_xp || 0) + badge.xp_reward,
        })
        .eq("user_id", userData.user.id)
    }

    return NextResponse.json({
      success: true,
      awardedBadges: badgesToAward.map((b) => ({ id: b.id, name: b.name })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to check badges" },
      { status: 500 },
    )
  }
}
