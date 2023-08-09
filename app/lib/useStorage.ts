"use client"

import { useEffect, Dispatch, SetStateAction } from "react"

export default function useStorage<T>(
  key: string,
  state: T,
  setState: Dispatch<SetStateAction<T>>,
  storageType: "local" | "session" = "session"
) {
  const storage = storageType === "local" ? localStorage : sessionStorage
  useEffect(() => {
    const value = storage.getItem(key)
    if (value) {
      setState(JSON.parse(value))
    }
  }, [])
  useEffect(() => {
    storage.setItem(key, JSON.stringify(state))
  }, [state])
}
