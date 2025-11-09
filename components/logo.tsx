import { AnimatedLogo } from "./animated-logo"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <AnimatedLogo />
      <span className="font-bold text-lg neon-text">LearnFlow</span>
    </div>
  )
}
