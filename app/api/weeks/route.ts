import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { weeks } from "@/lib/db/schema"
import { NewWeek } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const newWeekData: NewWeek = await req.json()
    const result = await db.insert(weeks).values(newWeekData).returning()
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating week:", error)
    return NextResponse.json({ error: "Failed to create week" }, { status: 500 })
  }
}
