import { JwtPayload } from "jsonwebtoken"

export const COOKIE_ACCESS_TOKEN = "access-token"
export interface CustomPayload extends JwtPayload {
  email: string
}

export interface User {
  username: string
  email: string
}
