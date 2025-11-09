"use client"

import { Card } from "@/components/ui/card"

interface LeaderboardUser {
  user_id: string
  total_xp: number
  current_level: number
  profiles: {
    first_name: string
  }
}

interface LeaderboardProps {
  users: LeaderboardUser[]
  currentUserId: string
}

export function Leaderboard({ users, currentUserId }: LeaderboardProps) {
  const getMedalEmoji = (rank: number) => {
    if (rank === 0) return "🥇"
    if (rank === 1) return "🥈"
    if (rank === 2) return "🥉"
    return `${rank + 1}`
  }

  const isCurrentUser = (userId: string) => userId === currentUserId

  return (
    <Card className="border-slate-700 bg-slate-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-700/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Level</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {users.map((user, index) => (
              <tr
                key={user.user_id}
                className={`${
                  isCurrentUser(user.user_id) ? "bg-slate-700/50 border-l-4 border-cyan-400" : "hover:bg-slate-700/30"
                } transition`}
              >
                <td className="px-6 py-4">
                  <span className="text-lg">{getMedalEmoji(index)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {user.profiles.first_name.charAt(0)}
                    </div>
                    <span className="text-white font-medium">
                      {user.profiles.first_name}
                      {isCurrentUser(user.user_id) && " (You)"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-yellow-400 font-semibold">{user.current_level}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-emerald-400 font-semibold">{user.total_xp}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
