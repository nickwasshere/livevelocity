import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Velocity - Roblox Executor",
  description: "The 4th Best Internal Executor After Hyperion. Experience unmatched power and stability with Velocity.",
  generator: "Velocity",
  applicationName: "Velocity",
  creator: "Velocity",
  publisher: "Velocity",
  authors: [{ name: "Velocity" }],
  keywords: ["Velocity", "executor", "Roblox", "script", "internal"],
  openGraph: {
    type: "website",
    title: "Velocity - Roblox Executor",
    description:
      "The 4th Best Internal Executor After Hyperion. Experience unmatched power and stability with Velocity.",
    siteName: "Velocity",
    url: "https://livevelocity.vercel.app/",
    images: [
      {
        url: "/velocity.png",
        width: 512,
        height: 512,
        alt: "Velocity Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Velocity - Roblox Executor",
    description:
      "The 4th Best Internal Executor After Hyperion. Experience unmatched power and stability with Velocity.",
    creator: "@Velocity",
    images: ["/velocity.png"],
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
