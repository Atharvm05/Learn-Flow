"use client"

import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AnimatedLogo } from "@/components/animated-logo"

interface DashboardNavProps {
  user: User
}

export function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav className="border-b border-cyan-500/20 bg-background/50 backdrop-blur-xl sticky top-0 z-40 animate-glow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition group">
          <AnimatedLogo />
          <span className="font-bold text-lg neon-text group-hover:purple-neon transition-all duration-300">
            LearnFlow
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/courses" className="text-foreground/70 hover:neon-text transition duration-300 relative group">
            Courses
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/progress" className="text-foreground/70 hover:neon-text transition duration-300 relative group">
            Progress
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/community" className="text-foreground/70 hover:neon-text transition duration-300 relative group">
            Community
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/projects" className="text-foreground/70 hover:neon-text transition duration-300 relative group">
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/leaderboard"
            className="text-foreground/70 hover:neon-text transition duration-300 relative group"
          >
            Leaderboard
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-foreground/70 hover:text-cyan-400 transition duration-300 border border-cyan-500/20 hover:border-cyan-500/50"
            >
              {user.email?.split("@")[0]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-cyan-500/30">
            <DropdownMenuItem className="text-foreground cursor-pointer hover:text-cyan-400">
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground cursor-pointer hover:text-cyan-400" onClick={handleLogout}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
