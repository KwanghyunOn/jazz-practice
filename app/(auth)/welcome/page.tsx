"use client"

import { redirect } from "next/navigation"
import { useUserContext } from "@/components/UserContext"
import Link from "next/link"

export default function WelcomePage() {
  const { user } = useUserContext()
  if (!user) {
    redirect("/")
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-xl font-semibold">Welcome to Jazz Practice!</div>
      <Link
        href="/"
        className="btn-primary py-4 text-xl text-center font-semibold rounded-md"
      >
        Start practice
      </Link>
    </div>
  )
}
