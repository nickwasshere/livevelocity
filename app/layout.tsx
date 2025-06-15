import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Velocity - Roblox Executor",
  description: "Unleash Your Potential with Velocity. Experience the next generation of Roblox execution.",
  generator: "Velocity",
  creator: "Velocity",
  publisher: "Velocity",
  authors: [{ name: "Velocity" }],
  keywords: ["Velocity", "executor", "Roblox", "script", "internal"],
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
  icons: {
    icon: "/velocity.png",
    shortcut: "/velocity.png",
    apple: "/velocity.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Velocity - Roblox Executor" />
        <meta property="og:description" content="Unleash Your Potential with Velocity" />
        <meta property="og:image" content="/velocity.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, nocache" />
      </head>
      <body>{children}</body>
    </html>
  )
}
