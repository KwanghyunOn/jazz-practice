"use client"

import { useEffect, Dispatch, SetStateAction } from "react"

export default function useStorage<T>(
  key: string,
  state: T,
  setState: Dispatch<SetStateAction<T>>,
  storageType: "local" | "session" = "local"
) {
  useEffect(() => {
    const storage = storageType === "local" ? localStorage : sessionStorage
    const value = storage.getItem(key)
    if (value) {
      setState(JSON.parse(value))
    }
  }, [])
  useEffect(() => {
    const storage = storageType === "local" ? localStorage : sessionStorage
    storage.setItem(key, JSON.stringify(state))
  }, [state])
}
