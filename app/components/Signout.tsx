"use client"

import { useUserContext } from "./UserContext"

export default function Signout({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserContext()
  return (
    <div className="cursor-pointer" onClick={() => setUser(null)}>
      {children}
    </div>
  )
}
