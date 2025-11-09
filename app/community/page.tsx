import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { CreatePostForm } from "@/components/community/create-post-form"
import { CommunityFeed } from "@/components/community/community-feed"

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  // Get community posts with user profiles
  const { data: posts } = await supabase
    .from("community_posts")
    .select("*, profiles(first_name, avatar_url), post_likes(id), post_comments(id)")
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNav user={userData.user} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Community Feed</h1>
        <p className="text-slate-400 mb-8">Share your progress, ask questions, and celebrate wins with learners</p>

        {/* Create Post Form */}
        <div className="mb-8">
          <CreatePostForm userId={userData.user.id} />
        </div>

        {/* Community Feed */}
        <CommunityFeed posts={posts || []} currentUserId={userData.user.id} />
      </main>
    </div>
  )
}
