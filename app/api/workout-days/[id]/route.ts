import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { workoutDays } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updatedWorkoutDayData = await req.json()
    const result = await db.update(workoutDays).set(updatedWorkoutDayData).where(eq(workoutDays.id, parseInt(id))).returning()
    if (result.length === 0) {
      return NextResponse.json({ error: "Workout day not found" }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating workout day:", error)
    return NextResponse.json({ error: "Failed to update workout day" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const result = await db.delete(workoutDays).where(eq(workoutDays.id, parseInt(id))).returning()
    if (result.length === 0) {
      return NextResponse.json({ error: "Workout day not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Workout day deleted successfully" })
  } catch (error) {
    console.error("Error deleting workout day:", error)
    return NextResponse.json({ error: "Failed to delete workout day" }, { status: 500 })
  }
}
