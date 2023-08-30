"use client"

import { useState } from "react"
import { useUserContext } from "./UserContext"
import Link from "next/link"

export default function LoginForm({
  onSuccess = () => {},
}: {
  onSuccess?: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [unauthorized, setUnauthorized] = useState(false)
  const { setUser } = useUserContext()

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    if (response?.ok) {
      const { user } = await response.json()
      setUser(user)
      setUnauthorized(false)
      onSuccess()
    } else {
      setUnauthorized(true)
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-6 gap-4 w-[80vw] max-w-sm bg-neutral-100 dark:bg-neutral-800 flex flex-col rounded-lg"
      >
        <label className="flex flex-col text-lg gap-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-3 text-base rounded-md border focus:outline-none focus:ring-1 
            border-neutral-300 bg-neutral-100 placeholder-neutral-300  focus:border-indigo-400 focus:ring-indigo-400
            dark:border-neutral-700 dark:bg-neutral-700 dark:placeholder-neutral-400  focus:dark:border-indigo-500 focus:dark:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col text-lg gap-2">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-base rounded-md border focus:outline-none focus:ring-1 
            border-neutral-300 bg-neutral-100 placeholder-neutral-300  focus:border-indigo-400 focus:ring-indigo-400
            dark:border-neutral-700 dark:bg-neutral-700 dark:placeholder-neutral-400  focus:dark:border-indigo-500 focus:dark:ring-indigo-500"
          />
        </label>
        {unauthorized && (
          <p className="mt-1 p-1 text-sm text-right text-red-500 dark:text-red-400">
            Invalid username or password.
          </p>
        )}
        <div className="mt-2 flex flex-col justify-center gap-2">
          <button
            className="btn-primary w-full py-3 text-base rounded-md"
            type="submit"
          >
            Log in
          </button>
          <p className="text-center">or</p>
          <Link
            className="w-full py-3 border border-solid text-base text-center rounded-md
          border-neutral-300 hover:bg-neutral-200 hover:border-neutral-200
          dark:border-neutral-600 dark:hover:bg-neutral-700 dark:hover:border-neutral-700"
            href="/register"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
