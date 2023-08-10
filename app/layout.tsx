import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jazz Practice",
  description: "Practice jazz!",
}

export default function RootLayout({
  navbar,
  children,
}: {
  navbar: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-[100dvh]">
          <div className="grow-0 sticky top-0">{navbar}</div>
          <div className="grow-1 h-full">{children}</div>
        </div>
      </body>
    </html>
  )
}
