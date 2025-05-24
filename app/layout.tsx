import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Velocity - Roblox Executor",
  description: "The 4th Best Internal Executor After Hyperion. Experience unmatched power and stability with Velocity.",
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
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="" />
        <meta property="og:site_name" content="" />
        <meta name="twitter:card" content="" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, nocache" />
      </head>
      <body>{children}</body>
    </html>
  )
}
