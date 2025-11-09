import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgressStatsProps {
  stats: {
    courses_completed: number
    courses_in_progress: number
    total_hours_learned: number
    total_xp: number
    current_level: number
  } | null
}

export function ProgressStats({ stats }: ProgressStatsProps) {
  const data = stats || {
    courses_completed: 0,
    courses_in_progress: 0,
    total_hours_learned: 0,
    total_xp: 0,
    current_level: 1,
  }

  const statItems = [
    {
      label: "Current Level",
      value: data.current_level,
      icon: "⭐",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Courses Completed",
      value: data.courses_completed,
      icon: "🏆",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "In Progress",
      value: data.courses_in_progress,
      icon: "📚",
      color: "from-cyan-500 to-blue-600",
    },
    {
      label: "Total Hours",
      value: data.total_hours_learned,
      icon: "⏱️",
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Total XP",
      value: data.total_xp,
      icon: "✨",
      color: "from-orange-500 to-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
      {statItems.map((item) => (
        <Card key={item.label} className="border-slate-700 bg-slate-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-400">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-white">{item.value}</div>
              <div className="text-3xl">{item.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
