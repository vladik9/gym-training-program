import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { exercises } from "@/lib/db/schema"
import { NewExercise } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const newExerciseData: NewExercise = await req.json()
    const result = await db.insert(exercises).values(newExerciseData).returning()
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating exercise:", error)
    return NextResponse.json({ error: "Failed to create exercise" }, { status: 500 })
  }
}