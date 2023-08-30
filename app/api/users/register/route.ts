import { StatusCodes } from "http-status-codes"
import { addUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json()
    if (await db.user.findUnique({ where: { email: email } })) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already exists",
          error: "email_already_exists",
        }),
        { status: StatusCodes.CONFLICT }
      )
    }
    await addUser(username, email, password)
    return new Response(JSON.stringify({ success: true }), {
      status: StatusCodes.CREATED,
    })
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: (err as Error).message || "Register error",
      }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
