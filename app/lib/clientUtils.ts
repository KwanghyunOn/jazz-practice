"use client"

import { useState } from "react"

export const useStorage = <T>(
  key: string,
  initialValue: T,
  storageType: "session" | "local" = "session"
): [T, (value: T) => void] => {
  const storage = storageType === "session" ? sessionStorage : localStorage
  const [state, setState] = useState(() => {
    try {
      const value = storage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.log(error)
    }
  })
  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      storage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }
  return [state, setValue]
}
