"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Post {
  id: string
  content: string
  created_at: string
  user_id: string
  likes_count: number
  profiles: {
    first_name: string
    avatar_url: string | null
  }
  post_likes: { id: string }[]
  post_comments: { id: string }[]
}

interface CommunityFeedProps {
  posts: Post[]
  currentUserId: string
}

export function CommunityFeed({ posts, currentUserId }: CommunityFeedProps) {
  const [likes, setLikes] = useState<Record<string, boolean>>({})
  const [comments, setComments] = useState<Record<string, string>>({})
  const supabase = createClient()

  const handleLike = async (postId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", currentUserId)
      } else {
        await supabase.from("post_likes").insert({
          post_id: postId,
          user_id: currentUserId,
        })
      }
      setLikes((prev) => ({
        ...prev,
        [postId]: !isLiked,
      }))
    } catch (error) {
      console.error("Error updating like:", error)
    }
  }

  const handleComment = async (postId: string) => {
    const content = comments[postId]
    if (!content?.trim()) return

    try {
      await supabase.from("post_comments").insert({
        post_id: postId,
        user_id: currentUserId,
        content: content.trim(),
      })
      setComments((prev) => ({
        ...prev,
        [postId]: "",
      }))
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No posts yet. Be the first to share your learning journey!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const isLiked = likes[post.id] !== undefined ? likes[post.id] : false
        const timeSinceCreated = new Date(post.created_at).toLocaleDateString()

        return (
          <Card key={post.id} className="border-slate-700 bg-slate-800/50">
            <CardContent className="pt-6">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                  {post.profiles.first_name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{post.profiles.first_name}</p>
                  <p className="text-slate-400 text-sm">{timeSinceCreated}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-slate-300 mb-4 whitespace-pre-wrap">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-4 mb-4 text-sm text-slate-400 border-t border-b border-slate-700 py-3">
                <button
                  onClick={() => handleLike(post.id, isLiked)}
                  className="flex items-center gap-2 hover:text-cyan-400 transition"
                >
                  <span>{isLiked ? "❤️" : "🤍"}</span>
                  <span>{post.post_likes.length}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-cyan-400 transition">
                  <span>💬</span>
                  <span>{post.post_comments.length}</span>
                </button>
              </div>

              {/* Comment Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Share a comment..."
                  value={comments[post.id] || ""}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                  className="bg-slate-700 border-slate-600 text-white text-sm"
                />
                <Button
                  onClick={() => handleComment(post.id)}
                  disabled={!comments[post.id]?.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700 text-xs"
                  size="sm"
                >
                  Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
