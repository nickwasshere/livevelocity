import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Velocity",
  description: "Velocity executer",
  generator: "Velocity executer",
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
