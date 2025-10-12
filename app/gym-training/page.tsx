import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, Dumbbell, Play } from "lucide-react"
import { getAllPrograms, getWeeksByProgramId, getWorkoutDaysByWeekId } from "@/lib/db/queries"
import { Program, Week, WorkoutDay } from "@/lib/db/schema"
import GymTrainingClient from "./gym-training-client"

export default async function GymTrainingPage() {
  const programs = await getAllPrograms()
  const gymProgram = programs.find(p => p.type === "gym")

  if (!gymProgram) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Gym Training Program Not Found</h1>
        <p className="text-muted-foreground mt-4">Please ensure the gym program is seeded in the database.</p>
      </div>
    )
  }

  const weeks: (Week & { workoutDays: WorkoutDay[] })[] = []
  const programWeeks = await getWeeksByProgramId(gymProgram.id)

  for (const week of programWeeks) {
    const workoutDays = await getWorkoutDaysByWeekId(week.id)
    weeks.push({ ...week, workoutDays })
  }

  return <GymTrainingClient gymProgram={gymProgram} initialWeeks={weeks} />
}
