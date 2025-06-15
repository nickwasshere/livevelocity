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
  const [typedCode, setTypedCode] = useState("")

  // Starfield background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const stars: Array<{ x: number; y: number; size: number; opacity: number }> = []

    const initStars = () => {
      stars.length = 0
      const starCount = 200

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
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

  // Typing effect for code
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypedCode("|")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Starfield Background */}
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
          <button className="text-gray-300 hover:text-white text-sm">Contact</button>
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
                    "https://store-na-phx-1.gofile.io/download/web/177407fd-d04d-4358-9cfb-0a2c98cab7da/Velocity.zip"
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

          {/* Right Content - Code Editor */}
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
            {/* Editor Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center space-x-1">
                <img src="/velocity.png" alt="Velocity" className="w-4 h-4" />
                <div className="flex items-center bg-gray-700 rounded px-3 py-1 ml-2">
                  <span className="text-gray-300 text-sm">Script 1</span>
                  <X className="w-3 h-3 text-gray-400 ml-2 hover:text-white cursor-pointer" />
                </div>
                <button className="text-gray-400 hover:text-white px-2">
                  <span className="text-lg">+</span>
                </button>
              </div>
              <div className="flex items-center space-x-1">
                <button className="hover:bg-gray-700 p-1 rounded">
                  <Settings className="w-3 h-3 text-gray-400" />
                </button>
                <button className="hover:bg-gray-700 p-1 rounded">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </button>
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-gray-700 p-1 rounded">
                  <Minimize2 className="w-3 h-3 text-gray-400" />
                </button>
                <button className="hover:bg-gray-700 p-1 rounded">
                  <Maximize2 className="w-3 h-3 text-gray-400" />
                </button>
                <button className="hover:bg-gray-700 p-1 rounded">
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div className={isMinimized ? "hidden" : "block"}>
              <div className="p-6 font-mono text-sm min-h-[300px] bg-gray-900">
                <div className="text-white">
                  <span className="animate-pulse">|</span>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <Play className="w-4 h-4" />
                    <span>Execute</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <Square className="w-4 h-4" />
                    <span>Clear</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <FolderOpen className="w-4 h-4" />
                    <span>Open</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Inject</span>
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Minimized Notice */}
            {isMinimized && (
              <div className="p-4 text-center text-gray-500">Editor minimized - Click minimize button to restore</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
