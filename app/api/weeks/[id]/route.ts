import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { weeks } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updatedWeekData = await req.json()
    const result = await db.update(weeks).set(updatedWeekData).where(eq(weeks.id, parseInt(id))).returning()
    if (result.length === 0) {
      return NextResponse.json({ error: "Week not found" }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating week:", error)
    return NextResponse.json({ error: "Failed to update week" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const result = await db.delete(weeks).where(eq(weeks.id, parseInt(id))).returning()
    if (result.length === 0) {
      return NextResponse.json({ error: "Week not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Week deleted successfully" })
  } catch (error) {
    console.error("Error deleting week:", error)
    return NextResponse.json({ error: "Failed to delete week" }, { status: 500 })
  }
}
