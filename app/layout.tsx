import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Velocity",
  description: "Velocity executer",
  generator: "Velocity",
  applicationName: "Velocity",
  creator: "Velocity",
  publisher: "Velocity",
  authors: [{ name: "Velocity" }],
  keywords: ["Velocity", "executor", "Roblox"],
  openGraph: {
    title: "Velocity",
    description: "Velocity executer",
    siteName: "Velocity",
  },
  twitter: {
    title: "Velocity",
    description: "Velocity executer",
    creator: "@Velocity",
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
      <body>{children}</body>
    </html>
  )
}
