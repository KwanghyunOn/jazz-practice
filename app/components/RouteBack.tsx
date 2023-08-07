"use client"

import { useRouter } from "next/navigation"

export default function RouteBack({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()

  return (
    <div
      className={className}
      onClick={() => {
        router.back()
      }}
    >
      {children}
    </div>
  )
}
