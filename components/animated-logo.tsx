"use client"

import { useEffect, useRef } from "react"

export function AnimatedLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 40
    canvas.height = 40
    let animationId: number

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Outer circle
      ctx.strokeStyle = `hsl(180, 100%, 50%)`
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.7 + Math.sin(time / 500) * 0.3
      ctx.beginPath()
      ctx.arc(20, 20, 16, 0, Math.PI * 2)
      ctx.stroke()

      // Inner rotating square
      ctx.save()
      ctx.translate(20, 20)
      ctx.rotate((time / 2000) * Math.PI * 2)
      ctx.strokeStyle = `hsl(280, 100%, 50%)`
      ctx.lineWidth = 1.2
      ctx.globalAlpha = 0.8 + Math.sin(time / 600) * 0.2
      ctx.strokeRect(-8, -8, 16, 16)
      ctx.restore()

      // Center dot
      ctx.fillStyle = `hsl(180, 100%, 50%)`
      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.arc(20, 20, 2, 0, Math.PI * 2)
      ctx.fill()

      // Corner dots
      const corners = [
        [8, 8],
        [32, 8],
        [32, 32],
        [8, 32],
      ]
      corners.forEach((pos) => {
        ctx.fillStyle = `hsl(280, 100%, 50%)`
        ctx.globalAlpha = 0.6 + Math.sin(time / 400 + pos[0]) * 0.4
        ctx.beginPath()
        ctx.arc(pos[0], pos[1], 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-8 h-8" />
}
