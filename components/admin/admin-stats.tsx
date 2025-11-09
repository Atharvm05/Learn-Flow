import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminStatsProps {
  coursesCount: number
  studentsCount: number
}

export function AdminStats({ coursesCount, studentsCount }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-slate-700 bg-slate-800/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-400">Published Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-cyan-400">{coursesCount}</div>
        </CardContent>
      </Card>

      <Card className="border-slate-700 bg-slate-800/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-400">Total Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-400">{studentsCount}</div>
        </CardContent>
      </Card>

      <Card className="border-slate-700 bg-slate-800/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-400">Platform Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-400">--</div>
          <p className="text-xs text-slate-400 mt-1">System metric</p>
        </CardContent>
      </Card>
    </div>
  )
}
