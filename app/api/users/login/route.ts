import { cookies } from "next/headers"
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"
import { COOKIE_ACCESS_TOKEN, CustomPayload } from "@/types/auth"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const user = await db.user.findUnique({ where: { email: email } })
    if (!user) {
      return new Response(null, { status: StatusCodes.UNAUTHORIZED })
    }
    const match = await bcrypt.compare(password, user.passwordHash!)
    if (match) {
      const payload: CustomPayload = {
        username: user.username,
        email: user.email,
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1d",
      })
      cookies().set(COOKIE_ACCESS_TOKEN, accessToken, {
        sameSite: "lax",
        secure: true,
        httpOnly: true,
      })
      return new Response(
        JSON.stringify({
          user: { username: user.username, email: user.email },
        }),
        {
          status: StatusCodes.OK,
        }
      )
    }
  } catch (err) {
    return new Response(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
