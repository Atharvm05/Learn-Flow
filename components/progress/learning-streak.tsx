import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LearningStreakProps {
  streak: {
    current_streak: number
    longest_streak: number
    last_activity_date: string
  } | null
}

export function LearningStreak({ streak }: LearningStreakProps) {
  const data = streak || {
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: null,
  }

  const getStreakMessage = (days: number) => {
    if (days === 0) return "Start your learning streak today!"
    if (days === 1) return "Great start! Keep it going."
    if (days < 7) return "You're on fire! 🔥"
    if (days < 30) return "Amazing dedication! 💪"
    return "Unstoppable learner! 🚀"
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <CardHeader>
        <CardTitle className="text-white">Learning Streak</CardTitle>
        <CardDescription className="text-slate-400">Keep learning consistently to build your streak</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Current Streak</p>
              <p className="text-4xl font-bold text-cyan-400">{data.current_streak}</p>
              <p className="text-slate-400 text-sm mt-2">days</p>
            </div>
            <div className="text-6xl">🔥</div>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-300 mb-4">{getStreakMessage(data.current_streak)}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Longest Streak</span>
              <span className="text-white font-semibold">{data.longest_streak} days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
