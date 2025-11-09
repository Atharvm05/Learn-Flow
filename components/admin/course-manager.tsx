"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Course {
  id: string
  title: string
  description: string
  difficulty_level: string
  duration_hours: number
  is_published: boolean
  students_enrolled: number
}

interface CourseManagerProps {
  courses: Course[]
  instructorId: string
}

export function CourseManager({ courses, instructorId }: CourseManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty_level: "beginner",
    duration_hours: 10,
  })
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleCreateCourse = async () => {
    if (!formData.title.trim()) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("courses").insert({
        title: formData.title,
        description: formData.description,
        difficulty_level: formData.difficulty_level,
        duration_hours: formData.duration_hours,
        instructor_id: instructorId,
        is_published: false,
      })

      if (error) throw error

      setFormData({
        title: "",
        description: "",
        difficulty_level: "beginner",
        duration_hours: 10,
      })
      setIsOpen(false)
    } catch (error) {
      console.error("Error creating course:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublishCourse = async (courseId: string, isPublished: boolean) => {
    try {
      await supabase.from("courses").update({ is_published: !isPublished }).eq("id", courseId)
    } catch (error) {
      console.error("Error updating course:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600">
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="border-slate-700 bg-slate-800">
            <DialogHeader>
              <DialogTitle className="text-white">Create Course</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new course to your platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Course Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to React"
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Course description"
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300">Difficulty</label>
                  <select
                    value={formData.difficulty_level}
                    onChange={(e) => setFormData({ ...formData, difficulty_level: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded mt-1 p-2"
                  >
                    <option>beginner</option>
                    <option>intermediate</option>
                    <option>advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-300">Duration (hours)</label>
                  <Input
                    type="number"
                    value={formData.duration_hours}
                    onChange={(e) => setFormData({ ...formData, duration_hours: Number.parseInt(e.target.value) })}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>
              <Button
                onClick={handleCreateCourse}
                disabled={isLoading || !formData.title.trim()}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
              >
                {isLoading ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Table */}
      <Card className="border-slate-700 bg-slate-800/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Students</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4 text-white">{course.title}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-yellow-900 text-yellow-200 text-xs">{course.difficulty_level}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{course.duration_hours}h</td>
                  <td className="px-6 py-4 text-slate-400">{course.students_enrolled}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        course.is_published ? "bg-emerald-900 text-emerald-200" : "bg-slate-700 text-slate-300"
                      }
                    >
                      {course.is_published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => handlePublishCourse(course.id, course.is_published)}
                      size="sm"
                      className="text-xs"
                      variant={course.is_published ? "destructive" : "default"}
                    >
                      {course.is_published ? "Unpublish" : "Publish"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
