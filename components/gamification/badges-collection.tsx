"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: string
  requirement_type: string
  requirement_value: number
  xp_reward: number
}

interface BadgesCollectionProps {
  badges: Badge[]
  earnedBadgeIds: string[]
  userStats: any
}

export function BadgesCollection({ badges, earnedBadgeIds, userStats }: BadgesCollectionProps) {
  const getProgress = (badge: Badge) => {
    const stats = userStats || {}
    let current = 0

    switch (badge.requirement_type) {
      case "courses_completed":
        current = stats.courses_completed || 0
        break
      case "streak_days":
        current = stats.current_streak || 0
        break
      case "total_xp":
        current = stats.total_xp || 0
        break
      case "level":
        current = stats.current_level || 1
        break
      default:
        current = 0
    }

    return Math.min((current / badge.requirement_value) * 100, 100)
  }

  const groupedBadges = badges.reduce(
    (acc, badge) => {
      if (!acc[badge.category]) {
        acc[badge.category] = []
      }
      acc[badge.category].push(badge)
      return acc
    },
    {} as Record<string, Badge[]>,
  )

  return (
    <div className="space-y-12">
      {Object.entries(groupedBadges).map(([category, categoryBadges]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold text-white mb-6 capitalize">{category} Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryBadges.map((badge) => {
              const isEarned = earnedBadgeIds.includes(badge.id)
              const progress = getProgress(badge)

              return (
                <Card
                  key={badge.id}
                  className={`border-slate-700 ${
                    isEarned ? "bg-slate-700/50 border-yellow-500" : "bg-slate-800/50 opacity-50"
                  }`}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="text-6xl mb-2">{badge.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{badge.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{badge.description}</p>

                    {isEarned ? (
                      <div className="text-emerald-400 text-sm font-medium">✓ Earned</div>
                    ) : (
                      <div className="space-y-2">
                        <Progress value={progress} className="bg-slate-700" />
                        <p className="text-slate-400 text-xs">Progress: {Math.round(progress)}%</p>
                      </div>
                    )}

                    <p className="text-yellow-400 text-xs mt-3">+{badge.xp_reward} XP</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
