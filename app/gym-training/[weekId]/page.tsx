import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getWeekById, getWorkoutDaysByWeekId } from "@/lib/db/queries"
import { Week, WorkoutDay } from "@/lib/db/schema"
import { Dumbbell, ArrowLeft } from "lucide-react"
import GymWeekClient from "./gym-week-client"

interface WeekPageProps {
  params: {
    weekId: string
  }
}

export default async function GymWeekPage({ params }: WeekPageProps) {
  const weekId = parseInt(params.weekId.replace('week-', ''))

  // Fetch the week data from the database
  const weekData = await getWeekById(weekId)

  if (!weekData) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Week Not Found</h1>
        <p className="text-muted-foreground mt-4">Please select a valid week from the program.</p>
        <Button asChild className="mt-6">
          <Link href="/gym-training">Back to Gym Training</Link>
        </Button>
      </div>
    )
  }

  // Fetch workout days for this week
  const workoutDays = await getWorkoutDaysByWeekId(weekData.id)

  return <GymWeekClient weekData={{ ...weekData, workoutDays }} />
}