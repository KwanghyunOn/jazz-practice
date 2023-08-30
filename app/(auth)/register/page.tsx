"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/components/UserContext"
import Link from "next/link"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const { setUser } = useUserContext()
  const router = useRouter()

  const usernameRegex1 = new RegExp("^.{3,16}$")
  const usernameRegex2 = new RegExp("^[a-zA-Z0-9-_.]+$")
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
  )
  const passwordRegex1 = new RegExp("^.{8,32}$")
  const passwordRegex2 = new RegExp(
    "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]+$"
  )

  const isFormValid = () => {
    return (
      usernameRegex1.test(username) &&
      usernameRegex2.test(username) &&
      emailRegex.test(email) &&
      passwordRegex1.test(password) &&
      passwordRegex1.test(password)
    )
  }

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    if (!isFormValid()) return
    const registerResponse = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
    if (registerResponse?.ok) {
      const loginResponse = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const { user } = await loginResponse.json()
      setUser(user)
      router.push("/welcome")
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-6 w-full max-w-sm flex flex-col rounded-lg"
      >
        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-lg gap-2">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 text-base rounded-md border focus:outline-none focus:ring-1 
            border-neutral-300 bg-neutral-100 placeholder-neutral-300  focus:border-indigo-400 focus:ring-indigo-400
            dark:border-neutral-700 dark:bg-neutral-700 dark:placeholder-neutral-400  focus:dark:border-indigo-500 focus:dark:ring-indigo-500"
            />
            <div>
              <p
                className={`text-sm ${
                  usernameRegex1.test(username)
                    ? "text-neutral-400 dark:text-neutral-500"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                - Must be between 3 and 16 characters long. allowed.
              </p>
              <p
                className={`text-sm ${
                  usernameRegex2.test(username)
                    ? "text-neutral-400 dark:text-neutral-500"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                - Only letters, numbers, hyphens, underscores, and dots are
                allowed.
              </p>
            </div>
          </label>
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
            {!emailRegex.test(email) && (
              <p className="text-sm text-red-500 dark:text-red-400">
                Please provide a valid email address.
              </p>
            )}
          </label>
          <label className="flex flex-col text-lg gap-2">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full p-3 text-base rounded-md border focus:outline-none focus:ring-1 
            border-neutral-300 bg-neutral-100 placeholder-neutral-300  focus:border-indigo-400 focus:ring-indigo-400 invalid:border-pink-400 invalid:focus:border-pink-400 invalid:focus:ring-pink-400
            dark:border-neutral-700 dark:bg-neutral-700 dark:placeholder-neutral-400  focus:dark:border-indigo-500 focus:dark:ring-indigo-500 invalid:dark:border-pink-600 invalid:focus:dark:border-pink-600 invalid:focus:dark:ring-pink-600"
            />
            <div>
              <p
                className={`text-sm ${
                  passwordRegex1.test(password)
                    ? "text-neutral-400 dark:text-neutral-500"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                - Must be between 8 and 32 characters long.
              </p>
              <p
                className={`text-sm ${
                  passwordRegex2.test(password)
                    ? "text-neutral-400 dark:text-neutral-500"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                - Must contain one letter, one digit, and one special character.
              </p>
            </div>
          </label>
        </div>
        <div className="mt-4 flex flex-col justify-center gap-1">
          <button
            className="btn-primary w-full py-3 text-base rounded-md"
            type="submit"
            disabled={!isFormValid()}
          >
            Sign up
          </button>
          <p className="text-center text-sm">or</p>
          <Link className="text-center text-sm underline" href="#">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  )
}
