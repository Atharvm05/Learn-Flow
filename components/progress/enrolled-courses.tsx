"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface Enrollment {
  id: string
  progress_percent: number
  enrolled_at: string
  completed_at: string | null
  courses: {
    id: string
    title: string
    description: string
    xp_reward: number
  }
}

interface EnrolledCoursesProps {
  enrollments: Enrollment[]
}

export function EnrolledCourses({ enrollments }: EnrolledCoursesProps) {
  if (!enrollments || enrollments.length === 0) {
    return (
      <Card className="border-slate-700 bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-white">Your Courses</CardTitle>
          <CardDescription className="text-slate-400">You haven't enrolled in any courses yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">Start learning by enrolling in a course from the course catalog.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Your Courses</h2>
      <div className="space-y-4">
        {enrollments.map((enrollment) => (
          <Card key={enrollment.id} className="border-slate-700 bg-slate-800/50">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Link href={`/courses/${enrollment.courses.id}`}>
                    <h3 className="text-lg font-semibold text-white hover:text-cyan-400 transition">
                      {enrollment.courses.title}
                    </h3>
                  </Link>
                  <p className="text-slate-400 text-sm mt-1">{enrollment.courses.description}</p>
                </div>
                <span className="text-sm text-slate-400 ml-4">
                  {enrollment.completed_at ? "✓ Completed" : `${enrollment.progress_percent}%`}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white font-semibold">{enrollment.progress_percent}%</span>
                </div>
                <Progress value={enrollment.progress_percent} className="bg-slate-700" />
              </div>

              <div className="flex items-center justify-between mt-4 text-sm">
                <span className="text-slate-400">Started {new Date(enrollment.enrolled_at).toLocaleDateString()}</span>
                <span className="text-cyan-400">🎯 {enrollment.courses.xp_reward} XP</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
