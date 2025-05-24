"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Minimize2, Maximize2, Zap, Shield, Code, Users } from "lucide-react"

export default function VelocityPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const nodesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; connections: number[] }>>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false])
  const [typedCode, setTypedCode] = useState("")
  const codeRef = useRef<HTMLDivElement>(null)

  // Typing effect for code
  useEffect(() => {
    const originalCode = `print("Get Velocity Today")`
    let currentIndex = 0
    let isTyping = true

    const typeCode = () => {
      if (currentIndex < originalCode.length && isTyping) {
        setTypedCode(originalCode.substring(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeCode, Math.random() * 50 + 50)
      } else if (currentIndex >= originalCode.length) {
        // Restart after delay
        setTimeout(() => {
          currentIndex = 0
          setTypedCode("")
          typeCode()
        }, 3000)
      }
    }

    const timer = setTimeout(typeCode, 1000)
    return () => {
      clearTimeout(timer)
      isTyping = false
    }
  }, [])

  // Intersection Observer for feature cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            const delay = Number.parseInt(entry.target.getAttribute("data-delay") || "0")

            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, delay * 200)

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll(".feature-card")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initNodes = () => {
      const nodes = []
      const nodeCount = 80

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }

      // Create connections
      nodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * 4) + 1
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * nodes.length)
          if (targetIndex !== i && !node.connections.includes(targetIndex)) {
            node.connections.push(targetIndex)
          }
        }
      })

      nodesRef.current = nodes
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const mouse = mouseRef.current
      const time = Date.now() * 0.001

      // Update node positions with wave motion
      nodes.forEach((node, i) => {
        // Mouse attraction with stronger effect
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 300) {
          const force = ((300 - distance) / 300) * 0.05
          node.vx += (dx / distance) * force
          node.vy += (dy / distance) * force
        }

        // Add wave motion
        node.vx += Math.sin(time + i * 0.1) * 0.01
        node.vy += Math.cos(time + i * 0.1) * 0.01

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Boundary bounce with padding
        if (node.x < 50 || node.x > canvas.width - 50) node.vx *= -0.8
        if (node.y < 50 || node.y > canvas.height - 50) node.vy *= -0.8

        // Keep in bounds with padding
        node.x = Math.max(50, Math.min(canvas.width - 50, node.x))
        node.y = Math.max(50, Math.min(canvas.height - 50, node.y))

        // Friction
        node.vx *= 0.995
        node.vy *= 0.995
      })

      // Draw connections with gradient and glow
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          if (connectionIndex < nodes.length) {
            const target = nodes[connectionIndex]
            const distance = Math.sqrt((node.x - target.x) ** 2 + (node.y - target.y) ** 2)

            if (distance < 200) {
              const opacity = (200 - distance) / 200

              // Create gradient line
              const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y)
              gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.6})`)
              gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.4})`)
              gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.6})`)

              ctx.strokeStyle = gradient
              ctx.lineWidth = opacity * 2
              ctx.shadowColor = "rgba(59, 130, 246, 0.5)"
              ctx.shadowBlur = 5

              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(target.x, target.y)
              ctx.stroke()

              ctx.shadowBlur = 0
            }
          }
        })
      })

      // Draw nodes with glow effect
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5
        const size = 2 + pulse * 1.5

        // Glow effect
        ctx.shadowColor = "rgba(59, 130, 246, 0.8)"
        ctx.shadowBlur = 10
        ctx.fillStyle = `rgba(59, 130, 246, ${0.8 + pulse * 0.2})`

        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Inner bright core
        ctx.shadowBlur = 0
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 0.3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      resizeCanvas()
      initNodes()
    }

    resizeCanvas()
    initNodes()
    animate()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #020617 100%)",
        }}
      />

      {/* Top Banner */}
      <div className="relative z-10 bg-blue-600 text-white text-center py-2 text-sm">
        The Opera download is an advert and can be ignored by clicking the download button again.
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <img src="/velocity.png" alt="Velocity Logo" className="w-6 h-6" />
          <span className="text-blue-400 font-bold text-xl">VELOCITY</span>
        </div>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
          onClick={() => window.open("https://discord.com/invite/velocityide", "_blank")}
        >
          Discord
        </Button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                The 4th &<br />
                <span className="text-blue-400">Best Internal</span>
                <br />
                Executor After
                <br />
                Hyperion.
              </h1>
              <p className="text-gray-300 text-lg max-w-md">
                Experience unmatched power and stability with our cutting-edge Roblox executor. Built for performance
                and reliability.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium rounded-lg transition-all duration-200"
                onClick={() => {
                  // Create a dummy file for download - CHANGE ME: Replace with your actual download URL
                  const link = document.createElement("a")
                  link.href =
                    "https://cdn.discordapp.com/attachments/1375795466075115570/1375811440623222834/Output.exe?ex=68330bc0&is=6831ba40&hm=b6427ed40302a03572d8e81e6f89c5c7c496a3eb3900be2be531f46c03473f2c&" // CHANGE ME: Replace with actual download URL
                  link.download = "Velocity.exe"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                Download Velocity
              </button>
              <button className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-3 text-base font-medium rounded-lg transition-all duration-200">
                FAQ
              </button>
            </div>
          </div>

          {/* Right Content - Code Editor */}
          <div className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden shadow-2xl" id="editor-area">
            {/* Editor Header */}
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-600">
              <div className="flex items-center space-x-1">
                <div className="flex items-center bg-slate-700 rounded px-3 py-1">
                  <span className="text-gray-300 text-sm">Script 1</span>
                  <X className="w-3 h-3 text-gray-400 ml-2 hover:text-white cursor-pointer" />
                </div>
                <button className="text-gray-400 hover:text-white px-2">
                  <span className="text-lg">+</span>
                </button>
              </div>
              <div className="flex items-center space-x-1">
                <button className="hover:bg-slate-700 p-1 rounded">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                </button>
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-slate-700 p-1 rounded">
                  <Minimize2 className="w-3 h-3 text-gray-400" />
                </button>
                <button className="hover:bg-slate-700 p-1 rounded">
                  <Maximize2 className="w-3 h-3 text-gray-400" />
                </button>
                <button className="hover:bg-slate-700 p-1 rounded">
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div id="editor-content" className={isMinimized ? "hidden" : "block"}>
              <div className="p-6 font-mono text-sm min-h-[200px] bg-slate-800">
                <div ref={codeRef} id="code-content" className="text-blue-400">
                  <span className="text-blue-400">print</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">"{typedCode.includes('"') ? typedCode.split('"')[1] : ""}"</span>
                  <span className="text-white">{typedCode.includes(")") ? ")" : ""}</span>
                  {typedCode.length < 22 && <span className="animate-pulse text-white">|</span>}
                </div>
              </div>

              {/* Editor Footer */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-t border-slate-600">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <span>▶</span>
                    <span>Execute</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <span>📋</span>
                    <span>Clear</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <span>📂</span>
                    <span>Open</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <span>💾</span>
                    <span>Save</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm">
                    <span>⚡</span>
                    <span>Inject</span>
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 px-4 py-2 text-xs text-gray-500 border-t border-slate-700">
                <span className="text-green-400">●</span> Version 0.1.6 |{" "}
                <span className="underline cursor-pointer hover:text-gray-400">Roblox version e00a4ca39fb04359</span>
              </div>
            </div>

            {/* Minimized Notice */}
            <div id="minimized-notice" className={isMinimized ? "block p-4 text-center text-gray-500" : "hidden"}>
              Editor minimized - Click minimize button to restore
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            {
              icon: <Zap className="w-8 h-8 text-blue-400" />,
              title: "99 UNC & 98 sUNC",
              desc: "Unrestricted Lua Execution",
            },
            {
              icon: <Shield className="w-8 h-8 text-blue-400" />,
              title: "Secure",
              desc: "Always updated to match Hyperions security measures",
            },
            {
              icon: <Code className="w-8 h-8 text-blue-400" />,
              title: "Features",
              desc: "Over 150+ functions",
            },
            {
              icon: <Users className="w-8 h-8 text-blue-400" />,
              title: "108,101",
              desc: "Discord Members",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`feature-card bg-slate-800/30 border-slate-700/50 text-center p-6 transition-all duration-500 backdrop-blur-sm ${
                visibleCards[index] ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
              data-index={index}
              data-delay={index}
            >
              <CardContent className="space-y-3 p-0">
                <div className="flex justify-center">{feature.icon}</div>
                <div className="text-white font-bold text-xl">{feature.title}</div>
                <div className="text-gray-400 text-sm">{feature.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
