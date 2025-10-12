import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllPrograms, getWeekByProgramIdAndWeekNumber, getWorkoutDayByWeekIdAndDayName, getExercisesForWorkoutDay } from "@/lib/db/queries"
import { Program, Week, WorkoutDay, Exercise } from "@/lib/db/schema"
import { Dumbbell, ArrowLeft } from "lucide-react"

interface DayPageProps {
  params: {
    weekId: string
    dayId: string
  }
}

export default async function GymDayPage({ params }: DayPageProps) {
  const weekNumber = parseInt(params.weekId.replace('week-', ''))
  const dayName = params.dayId.replace('day-', '').replace(/-/g, " ")

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

  const week: Week | undefined = await getWeekByProgramIdAndWeekNumber(gymProgram.id, weekNumber)

  if (!week) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Week {weekNumber} Not Found</h1>
        <p className="text-muted-foreground mt-4">Please select a valid week from the program.</p>
        <Button asChild className="mt-6">
          <Link href={`/gym-training/week-${weekNumber}`}>Back to Week {weekNumber}</Link>
        </Button>
      </div>
    )
  }

  const workoutDay: (WorkoutDay & { exercises: Exercise[] }) | undefined = await getWorkoutDayByWeekIdAndDayName(week.id, dayName)

  if (!workoutDay) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Workout for {dayName} in Week {weekNumber} Not Found</h1>
        <p className="text-muted-foreground mt-4">Please select a valid day and week.</p>
        <Button asChild className="mt-6">
          <Link href={`/gym-training/week-${weekNumber}`}>Back to Week {weekNumber}</Link>
        </Button>
      </div>
    )
  }

  workoutDay.exercises = await getExercisesForWorkoutDay(workoutDay.id)

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">WEEK {weekNumber} - {workoutDay.dayName.toUpperCase()}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Focus: {workoutDay.focus}
          </p>
          <Button asChild variant="outline">
            <Link href={`/gym-training/week-${weekNumber}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Week {weekNumber}
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workoutDay.exercises.map((exercise: Exercise, idx: number) => (
            <Card key={idx} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  {exercise.name}
                </CardTitle>
                <CardDescription>Sets: {exercise.sets}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {exercise.notes && <p className="text-sm text-muted-foreground mb-2">Notes: {exercise.notes}</p>}
                {/* Placeholder for exercise media (GIFs, videos) */}
                <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
                  Exercise Media Placeholder
                </div>
                <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                  <Link href={`/exercises/${exercise.id}`}>View Exercise Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
