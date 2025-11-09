"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Mentor {
  id: string
  first_name: string
  bio: string | null
  user_stats: {
    current_level: number
    total_xp: number
  }
}

interface MentorGridProps {
  mentors: Mentor[]
  currentUserId: string
}

export function MentorGrid({ mentors, currentUserId }: MentorGridProps) {
  const [requestedMentors, setRequestedMentors] = useState<Set<string>>(new Set())
  const supabase = createClient()

  const handleRequestMentorship = async (mentorId: string) => {
    try {
      const { error } = await supabase.from("mentorship_requests").insert({
        requester_id: currentUserId,
        mentor_id: mentorId,
      })

      if (error) throw error
      setRequestedMentors((prev) => new Set([...prev, mentorId]))
    } catch (error) {
      console.error("Error requesting mentorship:", error)
    }
  }

  if (mentors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No mentors available yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mentors.map((mentor) => (
        <Card key={mentor.id} className="border-slate-700 bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-white">{mentor.first_name}</CardTitle>
            <CardDescription className="text-slate-400">
              Level {mentor.user_stats.current_level} • {mentor.user_stats.total_xp} XP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm mb-6">
              {mentor.bio || "Experienced learner ready to help others grow"}
            </p>
            <Button
              onClick={() => handleRequestMentorship(mentor.id)}
              disabled={requestedMentors.has(mentor.id)}
              className={`w-full ${
                requestedMentors.has(mentor.id)
                  ? "bg-slate-600"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
              }`}
            >
              {requestedMentors.has(mentor.id) ? "Request Sent" : "Request Mentorship"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
