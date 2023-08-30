import { COOKIE_ACCESS_TOKEN } from "@/types/auth"
import { NextRequest, NextResponse } from "next/server"

function addAuthHeader(req: NextRequest) {
  if (req.headers.get("authorization")) {
    return NextResponse.next()
  } else {
    const requestHeaders = new Headers(req.headers)
    const accessToken = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value
    if (accessToken) {
      requestHeaders.set("authorization", `Bearer ${accessToken}`)
    }
    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }
}

export async function middleware(req: NextRequest) {
  const res = addAuthHeader(req)
  return res
}

// export const config = {
//   matcher: ["/api/:path*"],
// }
