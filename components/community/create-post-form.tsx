"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

interface CreatePostFormProps {
  userId: string
}

export function CreatePostForm({ userId }: CreatePostFormProps) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("community_posts").insert({
        user_id: userId,
        content: content.trim(),
        post_type: "update",
      })

      if (error) throw error

      setContent("")
      router.refresh()
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your learning progress, ask questions, or celebrate wins..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white min-h-24 resize-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!content.trim() || isLoading}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
            >
              {isLoading ? "Posting..." : "Share"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
