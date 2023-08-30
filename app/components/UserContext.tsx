"use client"

import { useState, createContext, useContext } from "react"
import { User } from "@/types/auth"

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

export const UserProvider = ({
  value = null,
  children,
}: {
  value?: User | null
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(value)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
