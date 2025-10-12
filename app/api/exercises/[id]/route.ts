import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { exercises } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const exercise = await db.select().from(exercises).where(eq(exercises.id, parseInt(id))).get()
    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 })
    }
    return NextResponse.json(exercise)
  } catch (error) {
    console.error("Error fetching exercise:", error)
    return NextResponse.json({ error: "Failed to fetch exercise" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updatedExerciseData = await req.json()
    const result = await db.update(exercises).set(updatedExerciseData).where(eq(exercises.id, parseInt(id))).returning()
    if (result.length === 0) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating exercise:", error)
    return NextResponse.json({ error: "Failed to update exercise" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const result = await db.delete(exercises).where(eq(exercises.id, parseInt(id))).returning()
    if (result.length === 0) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Exercise deleted successfully" })
  } catch (error) {
    console.error("Error deleting exercise:", error)
    return NextResponse.json({ error: "Failed to delete exercise" }, { status: 500 })
  }
}