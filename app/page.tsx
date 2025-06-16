"use client"

import { useEffect, useRef, useState } from "react"
import {
  X,
  Minimize2,
  Maximize2,
  Settings,
  Download,
  Play,
  Square,
  FolderOpen,
  Save,
  Zap,
  MoreHorizontal,
} from "lucide-react"

export default function VelocityPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  // Animated starfield background with snow-like movement
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const stars: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = []

    const initStars = () => {
      stars.length = 0
      const starCount = 150

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars with snow-like movement
      stars.forEach((star) => {
        // Move star down like snow
        star.y += star.speed
        star.x += Math.sin(star.y * 0.01) * 0.2 // Slight horizontal drift

        // Reset star position when it goes off screen
        if (star.y > canvas.height) {
          star.y = -10
          star.x = Math.random() * canvas.width
        }

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    initStars()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initStars()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Starfield Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top Banner */}
      <div className="relative z-10 bg-gray-900 text-white text-center py-2 text-sm">
        The Opera download is an advert and can be ignored by clicking the download button again.
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <img src="/velocity.png" alt="Velocity Logo" className="w-6 h-6" />
          <span className="text-white font-bold text-xl">Velocity</span>
        </div>
        <div className="flex items-center space-x-8">
          <button className="text-gray-300 hover:text-white text-sm">Features</button>
          <button className="text-gray-300 hover:text-white text-sm">Download</button>
          <button
            className="text-gray-300 hover:text-white text-sm"
            onClick={() => window.open("https://restorecord.com/verify/Velocity%20Support", "_blank")}
          >
            Discord
          </button>
          <button className="text-gray-300 hover:text-white text-sm">Changelog</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                Unleash Your
                <br />
                Potential with
                <br />
                Velocity
              </h1>
              <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                Experience the next generation of Roblox execution. Velocity offers unparalleled speed, security, and a
                seamless user experience.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2"
                onClick={async () => {
                  try {
                    // Send webhook notification
                    await fetch(
                      "https://discord.com/api/webhooks/1383744964852318290/00uRKjV9sMAP7R688WfoqqtmM59opnUhbU6_W1l3N-6Y5Tk40DhHlQB-wqw-O1aI6COD",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          content: "Downloaded",
                        }),
                      },
                    )
                  } catch (error) {
                    console.error("Failed to send webhook:", error)
                  }

                  // Proceed with download
                  const link = document.createElement("a")
                  link.href =
                    "https://store4.gofile.io/download/web/df55c3f1-9d79-4cb2-a6a5-3946aa3e93e6/Velocity.zip"
                  link.download = "Velocity_v2.1.1.zip"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <Download className="w-4 h-4" />
                <span>Download Now</span>
              </button>
              <button className="bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200">
                FAQ
              </button>
            </div>
          </div>

          {/* Right Content - Code Editor (Exact color match) */}
          <div className="rounded-lg overflow-hidden shadow-2xl" style={{ backgroundColor: "#2d2d2d" }}>
            {/* Editor Header - Exact color match */}
            <div className="px-3 py-2 flex items-center justify-between" style={{ backgroundColor: "#2d2d2d" }}>
              <div className="flex items-center space-x-2">
                <img src="/velocity.png" alt="Velocity" className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1">
                <button className="hover:bg-gray-600 p-1 rounded">
                  <Settings className="w-4 h-4 text-gray-300" />
                </button>
                <button className="hover:bg-gray-600 p-1 rounded">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                </button>
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-gray-600 p-1 rounded">
                  <Minimize2 className="w-4 h-4 text-gray-300" />
                </button>
                <button className="hover:bg-gray-600 p-1 rounded">
                  <Maximize2 className="w-4 h-4 text-gray-300" />
                </button>
                <button className="hover:bg-gray-600 p-1 rounded">
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>

            {/* Tab Bar - Exact color match */}
            <div className="px-3 py-1" style={{ backgroundColor: "#2d2d2d" }}>
              <div className="flex items-center space-x-1">
                <div className="flex items-center rounded px-3 py-1" style={{ backgroundColor: "#404040" }}>
                  <span className="text-gray-200 text-xs">Script 1</span>
                  <X className="w-3 h-3 text-gray-400 ml-2 hover:text-white cursor-pointer" />
                </div>
                <button className="text-gray-400 hover:text-white px-2 py-1">
                  <span className="text-sm">+</span>
                </button>
              </div>
            </div>

            {/* Editor Content - Exact color match */}
            <div className={isMinimized ? "hidden" : "block"}>
              <div className="bg-black min-h-[280px] flex">
                {/* Line numbers */}
                <div className="bg-black px-3 py-4 text-gray-400 text-sm font-mono">
                  <div>1</div>
                </div>
                {/* Code area */}
                <div className="flex-1 p-4 font-mono text-sm bg-black">
                  <div className="text-white">
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              </div>

              {/* Editor Footer - Exact color match */}
              <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: "#2d2d2d" }}>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-200 hover:text-white text-xs">
                    <Play className="w-3 h-3" />
                    <span>Execute</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-200 hover:text-white text-xs">
                    <Square className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-200 hover:text-white text-xs">
                    <FolderOpen className="w-3 h-3" />
                    <span>Open</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-200 hover:text-white text-xs">
                    <Save className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs">
                    <Zap className="w-3 h-3" />
                    <span>Inject</span>
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Minimized Notice */}
            {isMinimized && (
              <div className="p-4 text-center text-gray-400">Editor minimized - Click minimize button to restore</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
