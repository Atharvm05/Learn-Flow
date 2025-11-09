"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Skill {
  id: string
  name: string
  category: string
  description: string
}

interface SkillsManagerProps {
  skills: Skill[]
}

export function SkillsManager({ skills }: SkillsManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Web Development",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleCreateSkill = async () => {
    if (!formData.name.trim()) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("skills").insert({
        name: formData.name,
        category: formData.category,
        description: formData.description,
      })

      if (error) throw error

      setFormData({
        name: "",
        category: "Web Development",
        description: "",
      })
      setIsOpen(false)
    } catch (error) {
      console.error("Error creating skill:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600">
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="border-slate-700 bg-slate-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Skill</DialogTitle>
              <DialogDescription className="text-slate-400">
                Create a new skill that courses can teach
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Skill Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., React"
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded mt-1 p-2"
                >
                  <option>Web Development</option>
                  <option>Data Science</option>
                  <option>Mobile Development</option>
                  <option>Cloud & DevOps</option>
                  <option>AI & Machine Learning</option>
                  <option>Design</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300">Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Skill description"
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              <Button
                onClick={handleCreateSkill}
                disabled={isLoading || !formData.name.trim()}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
              >
                {isLoading ? "Adding..." : "Add Skill"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <Card key={skill.id} className="border-slate-700 bg-slate-800/50 p-4">
                  <h4 className="text-white font-medium">{skill.name}</h4>
                  <p className="text-slate-400 text-sm mt-1">{skill.description}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
