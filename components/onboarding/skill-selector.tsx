"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Skill {
  id: string
  name: string
  category: string
}

interface SkillSelectorProps {
  skills: Skill[]
  onSubmit: (skillIds: string[]) => Promise<void>
}

export function SkillSelector({ skills, onSubmit }: SkillSelectorProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) => (prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await onSubmit(selectedSkills)
    } finally {
      setIsLoading(false)
    }
  }

  // Group skills by category
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
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Select Your Interests</CardTitle>
        <CardDescription className="text-slate-400">Help us personalize your learning experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <label key={skill.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedSkills.includes(skill.id)}
                    onCheckedChange={() => toggleSkill(skill.id)}
                    className="border-slate-600"
                  />
                  <span className="text-slate-300">{skill.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <Button
          onClick={handleSubmit}
          disabled={isLoading || selectedSkills.length === 0}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
        >
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </CardContent>
    </Card>
  )
}
