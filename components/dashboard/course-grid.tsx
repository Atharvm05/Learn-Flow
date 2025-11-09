"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { CourseCard } from "./course-card"
import { Spinner } from "@/components/ui/spinner"

interface Course {
  id: string
  title: string
  description: string
  difficulty_level: string
  duration_hours: number
  xp_reward: number
  students_enrolled: number
  thumbnail_url: string
}

export function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching courses:", error)
      } else {
        setCourses(data || [])
      }
      setIsLoading(false)
    }

    fetchCourses()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No courses available yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
