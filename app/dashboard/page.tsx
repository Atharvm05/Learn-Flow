import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { CourseGrid } from "@/components/dashboard/course-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const openSourceProjects = [
    {
      name: "freeCodeCamp",
      category: "Web Dev",
      description: "Free coding bootcamp with thousands of courses",
      icon: "📚",
      url: "https://freecodecamp.org",
    },
    {
      name: "Khan Academy",
      category: "All Subjects",
      description: "Free educational videos and practice exercises",
      icon: "🎓",
      url: "https://www.khanacademy.org",
    },
    {
      name: "Codecademy",
      category: "Programming",
      description: "Interactive coding courses and challenges",
      icon: "💻",
      url: "https://www.codecademy.com",
    },
    {
      name: "edX",
      category: "University Courses",
      description: "Free courses from top universities worldwide",
      icon: "🏫",
      url: "https://www.edx.org",
    },
    {
      name: "MIT OpenCourseWare",
      category: "Advanced CS",
      description: "Free MIT courses and materials",
      icon: "🔬",
      url: "https://ocw.mit.edu",
    },
    {
      name: "Coursera Audit",
      category: "Professional",
      description: "Audit any course for free, no certificate",
      icon: "🎯",
      url: "https://www.coursera.org",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <DashboardNav user={data.user} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-16 animate-slide-up">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Discover Your Path
            </h1>
            <p className="text-foreground/70 text-lg">Start your learning journey with expertly crafted courses</p>
          </div>
          <Link href="/courses">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-cyan-500/30">
              Browse All
            </Button>
          </Link>
        </div>

        {/* Featured Courses Section */}
        <div className="mb-20">
          <CourseGrid />
        </div>

        {/* Open Source Resources Section */}
        <div className="mb-20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              <span className="neon-text">Free</span> Learning Resources
            </h2>
            <p className="text-foreground/70">Access quality open-source platforms to expand your learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {openSourceProjects.map((project, i) => (
              <a key={i} href={project.url} target="_blank" rel="noopener noreferrer" className="group">
                <Card
                  className="border-cyan-500/20 bg-card/40 glass-effect hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 h-full cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl">{project.icon}</div>
                      <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <CardTitle className="neon-text group-hover:text-purple-400 transition duration-300">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70 group-hover:text-foreground/90 transition">
                      {project.description}
                    </CardDescription>
                    <Button variant="link" className="mt-3 text-cyan-400 hover:text-purple-400 p-0 h-auto">
                      Visit →
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* New Premium Features Section */}
        <div className="mb-20 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Premium <span className="purple-neon">Features</span>
            </h2>
            <p className="text-foreground/70">Unlock advanced learning tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 glass-effect hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 group cursor-pointer">
              <CardHeader>
                <div className="text-3xl mb-3 group-hover:scale-110 transition transform">🤖</div>
                <CardTitle className="neon-text">AI Course Creator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground/80">
                  Generate personalized learning courses using AI. Describe your goal and get a custom curriculum.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-cyan-400">✓</span> Custom course generation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">✓</span> Adaptive difficulty
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">✓</span> AI assessments
                  </li>
                </ul>
                <Link href="/create-course">
                  <Button size="sm" className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                    Create Course
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 glass-effect hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 group cursor-pointer">
              <CardHeader>
                <div className="text-3xl mb-3 group-hover:scale-110 transition transform">🚀</div>
                <CardTitle className="purple-neon">Community Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground/80">
                  Collaborate on open-source projects and build portfolio-worthy real-world work.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-purple-400">✓</span> Team collaboration
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">✓</span> Code reviews
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">✓</span> Portfolio showcase
                  </li>
                </ul>
                <Link href="/projects">
                  <Button size="sm" className="mt-4 bg-purple-600 hover:bg-purple-700">
                    Explore Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-orange-500/10 glass-effect hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 group cursor-pointer">
              <CardHeader>
                <div className="text-3xl mb-3 group-hover:scale-110 transition transform">🎖️</div>
                <CardTitle className="pink-neon">Skill Certification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground/80">
                  Earn industry-recognized certificates and showcase your achievements.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-pink-400">✓</span> Industry-backed certs
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-400">✓</span> LinkedIn integration
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-400">✓</span> Resume building
                  </li>
                </ul>
                <Link href="/badges">
                  <Button size="sm" className="mt-4 bg-pink-600 hover:bg-pink-700">
                    View Badges
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 glass-effect hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 group cursor-pointer">
              <CardHeader>
                <div className="text-3xl mb-3 group-hover:scale-110 transition transform">📱</div>
                <CardTitle style={{ color: "#00ff88" }}>Live Study Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground/80">
                  Join real-time sessions with mentors. Code together, get feedback instantly.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span style={{ color: "#00ff88" }}>✓</span> Interactive sessions
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: "#00ff88" }}>✓</span> Expert mentorship
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: "#00ff88" }}>✓</span> Recording replay
                  </li>
                </ul>
                <Button size="sm" className="mt-4" style={{ backgroundColor: "#00ff88", color: "#000" }}>
                  Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <Card className="border-cyan-500/20 bg-card/40 glass-effect hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">Active Learners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold neon-text">50K+</div>
              <p className="text-xs text-foreground/50 mt-1">Growing daily</p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-card/40 glass-effect hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">Courses Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold purple-neon">500+</div>
              <p className="text-xs text-foreground/50 mt-1">Constantly updated</p>
            </CardContent>
          </Card>

          <Card className="border-pink-500/20 bg-card/40 glass-effect hover:shadow-lg hover:shadow-pink-500/20 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold pink-neon">92%</div>
              <p className="text-xs text-foreground/50 mt-1">Industry leading</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/20 bg-card/40 glass-effect hover:shadow-lg hover:shadow-green-500/20 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">Avg Hours Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: "#00ff88" }}>
                248h
              </div>
              <p className="text-xs text-foreground/50 mt-1">Per learner/year</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
