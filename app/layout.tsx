import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getUser } from "@/lib/auth"
import { UserProvider } from "./components/UserContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jazz Practice",
  description: "Practice jazz!",
}

export default async function RootLayout({
  navbar,
  children,
}: {
  navbar: React.ReactNode
  children: React.ReactNode
}) {
  const user = await getUser()
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider value={user}>
          <div className="flex flex-col h-[100dvh]">
            <div className="grow-0 sticky top-0">{navbar}</div>
            <div className="grow-1 h-full">{children}</div>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
