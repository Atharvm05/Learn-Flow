import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedLogo } from "@/components/animated-logo"

export default function LandingPage() {
  const openSourceProjects = [
    {
      name: "freeCodeCamp",
      category: "Web Dev",
      description: "Free coding bootcamp with thousands of courses",
      url: "#",
    },
    {
      name: "Khan Academy",
      category: "All Subjects",
      description: "Free educational videos and practice exercises",
      url: "#",
    },
    {
      name: "Codecademy Open",
      category: "Programming",
      description: "Interactive coding courses and challenges",
      url: "#",
    },
    {
      name: "edX",
      category: "University Courses",
      description: "Free courses from top universities worldwide",
      url: "#",
    },
    {
      name: "Coursera Audit",
      category: "Professional",
      description: "Audit any course for free, no certificate",
      url: "#",
    },
    {
      name: "MIT OpenCourseWare",
      category: "Computer Science",
      description: "Free MIT courses and materials",
      url: "#",
    },
  ]

  const features = [
    { title: "AI Recommendations", description: "Get personalized learning paths based on your goals", icon: "✨" },
    { title: "Gamification", description: "Earn points, unlock badges, and compete on leaderboards", icon: "🎮" },
    { title: "Community", description: "Connect with peers, find mentors, and share progress", icon: "👥" },
    { title: "Skill Pathways", description: "Follow curated learning roadmaps to master new skills", icon: "🗺️" },
    { title: "Project Showcase", description: "Build real-world projects and showcase your portfolio", icon: "🚀" },
    { title: "Live Collaboration", description: "Code together in real-time with other learners", icon: "💻" },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between border-b border-border bg-background/50 backdrop-blur-md px-6 py-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <AnimatedLogo />
          <span className="font-bold text-lg neon-text">LearnFlow</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-foreground hover:text-primary transition">
              Log In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-cyan-500/20">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-8 inline-block animate-slide-up neon-border px-4 py-2 text-sm">
          <span className="neon-text">⚡ AI-Powered Learning Platform</span>
        </div>
        <h1
          className="text-6xl font-bold text-balance mb-4 max-w-4xl leading-tight animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="neon-text">Master</span> Real-World Skills in the Future
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Personalized learning with AI, gamification, community collaboration, and real projects. Your pathway to
          becoming an expert starts here.
        </p>
        <Link href="/auth/sign-up" className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-xl shadow-cyan-500/30"
          >
            Start Your Journey
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-20 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="border-border bg-card/40 glass-effect hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 animate-slide-up group"
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            <CardHeader>
              <CardTitle className="text-2xl mb-2">{feature.icon}</CardTitle>
              <CardTitle className="text-cyan-400 group-hover:text-purple-400 transition">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Open Source Projects Section */}
      <div className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="neon-text">Open Source</span> Learning Resources
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            We partner with leading free platforms to give you access to quality learning materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openSourceProjects.map((project, i) => (
            <Card
              key={i}
              className="border-border bg-card/40 glass-effect hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 cursor-pointer group animate-slide-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-pink-400 group-hover:text-cyan-400 transition">{project.name}</CardTitle>
                    <CardDescription className="text-purple-300 text-xs mt-1">{project.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{project.description}</p>
                <Button variant="link" className="mt-4 text-cyan-400 hover:text-purple-400 p-0">
                  Explore →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Premium <span className="purple-neon">Features</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border bg-card/40 glass-effect p-8 hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
            <h3 className="text-xl font-bold mb-3 neon-text">AI Course Creator</h3>
            <p className="text-foreground/80 mb-4">
              Generate personalized learning courses using AI. Describe your learning goal, and our AI will create a
              structured course with lessons, quizzes, and projects.
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>✓ Custom course generation</li>
              <li>✓ Adaptive difficulty levels</li>
              <li>✓ AI-powered assessments</li>
            </ul>
          </Card>

          <Card className="border-border bg-card/40 glass-effect p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <h3 className="text-xl font-bold mb-3 purple-neon">Community Projects</h3>
            <p className="text-foreground/80 mb-4">
              Collaborate on open-source projects, contribute to real-world problems, and build portfolio-worthy work
              alongside other learners.
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>✓ Team collaboration tools</li>
              <li>✓ Code reviews & feedback</li>
              <li>✓ Portfolio integration</li>
            </ul>
          </Card>

          <Card className="border-border bg-card/40 glass-effect p-8 hover:shadow-lg hover:shadow-pink-500/20 transition-all">
            <h3 className="text-xl font-bold mb-3 pink-neon">Skill Certification</h3>
            <p className="text-foreground/80 mb-4">
              Earn verifiable certificates recognized by industry partners. Showcase your skills on LinkedIn and in your
              professional portfolio.
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>✓ Industry-backed certs</li>
              <li>✓ LinkedIn integration</li>
              <li>✓ Resume building</li>
            </ul>
          </Card>

          <Card className="border-border bg-card/40 glass-effect p-8 hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
            <h3 className="text-xl font-bold mb-3" style={{ color: "#00ff88" }}>
              Live Study Sessions
            </h3>
            <p className="text-foreground/80 mb-4">
              Join scheduled study sessions with mentors and peers. Real-time code sharing, whiteboarding, and Q&A to
              accelerate your learning.
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>✓ Interactive sessions</li>
              <li>✓ Expert mentorship</li>
              <li>✓ Recording replay</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 px-6 max-w-4xl mx-auto text-center">
        <Card className="border-border bg-gradient-to-r from-cyan-500/10 to-purple-500/10 glass-effect p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-foreground/80 mb-8">
            Join thousands of students building real-world skills with AI-powered guidance and community support.
          </p>
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-xl"
            >
              Start Free Today
            </Button>
          </Link>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/50 backdrop-blur-md py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-foreground/60 text-sm">
          <p>Built with passion for learners everywhere</p>
          <p className="mt-2">LearnFlow © 2025 - Empowering the next generation of tech professionals</p>
        </div>
      </footer>
    </main>
  )
}
