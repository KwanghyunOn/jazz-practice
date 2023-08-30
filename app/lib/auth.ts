import { headers } from "next/headers"
import jwt from "jsonwebtoken"
import { CustomPayload } from "@/types/auth"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"

const saltRounds = 10

export async function getUser() {
  const authHeader = headers().get("authorization")
  const [scheme, token] = authHeader?.split(" ") ?? []
  if (scheme === "Bearer" && token) {
    try {
      const { username, email } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as CustomPayload
      return { username: username, email: email }
    } catch (err) {
      return null
    }
  } else {
    return null
  }
}

export async function addUser(
  username: string,
  email: string,
  password: string
) {
  const hash = await bcrypt.hash(password, saltRounds)
  await db.user.create({
    data: {
      username: username,
      email: email,
      passwordHash: hash,
    },
  })
}
