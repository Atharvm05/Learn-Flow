"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string
    difficulty_level: string
    duration_hours: number
    xp_reward: number
    students_enrolled: number
    thumbnail_url: string
  }
}

const difficultyColors = {
  beginner: "bg-emerald-900 text-emerald-200",
  intermediate: "bg-yellow-900 text-yellow-200",
  advanced: "bg-red-900 text-red-200",
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50 overflow-hidden hover:border-slate-600 transition">
      {course.thumbnail_url && (
        <div className="h-40 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
          <img
            src={course.thumbnail_url || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-white">{course.title}</CardTitle>
          <Badge className={`${difficultyColors[course.difficulty_level as keyof typeof difficultyColors]}`}>
            {course.difficulty_level}
          </Badge>
        </div>
        <CardDescription className="text-slate-400">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>⏱️ {course.duration_hours}h</span>
            <span>🎯 {course.xp_reward} XP</span>
            <span>👥 {course.students_enrolled}</span>
          </div>
          <Link href={`/courses/${course.id}`}>
            <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600">
              View Course
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
