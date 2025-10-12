import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail, createPasswordResetToken } from "@/lib/db/queries"
import { randomBytes } from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await getUserByEmail(email)

    if (!user) {
      // Return success even if user doesn't exist (security best practice)
      return NextResponse.json({ success: true })
    }

    const token = randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    await createPasswordResetToken(user.id, token, expiresAt)

    // In a real app, you would send an email here
    console.log(`[v0] Password reset token for ${email}: ${token}`)
    console.log(`[v0] Reset link: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Password reset error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
