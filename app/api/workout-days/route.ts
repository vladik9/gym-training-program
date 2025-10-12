import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { workoutDays } from "@/lib/db/schema"
import { NewWorkoutDay } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const newWorkoutDayData: NewWorkoutDay = await req.json()
    const result = await db.insert(workoutDays).values(newWorkoutDayData).returning()
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating workout day:", error)
    return NextResponse.json({ error: "Failed to create workout day" }, { status: 500 })
  }
}
