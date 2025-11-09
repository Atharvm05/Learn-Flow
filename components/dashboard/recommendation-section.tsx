"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"

interface Recommendation {
  id: string
  title: string
  description: string
  difficulty_level: string
  duration_hours: number
  xp_reward: number
  reason: string
  relevance_score: number
}

export function RecommendationSection() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("/api/recommendations")
        const data = await response.json()
        setRecommendations(data.recommendations || [])
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner />
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50 mb-12">
      <CardHeader>
        <CardTitle className="text-white">Recommended For You</CardTitle>
        <CardDescription className="text-slate-400">
          Personalized courses based on your interests and learning style
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-lg border border-slate-700 bg-slate-700/50 hover:border-cyan-400 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">{rec.title}</h3>
                <Badge className="bg-cyan-900 text-cyan-200 text-xs">
                  {Math.round(rec.relevance_score * 100)}% match
                </Badge>
              </div>
              <p className="text-slate-400 text-sm mb-3">{rec.reason}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span>{rec.difficulty_level}</span>
                <span>{rec.duration_hours}h</span>
                <span>{rec.xp_reward} XP</span>
              </div>
              <Link href={`/courses/${rec.id}`}>
                <Button className="w-full text-xs bg-cyan-600 hover:bg-cyan-700" size="sm">
                  View Course
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
