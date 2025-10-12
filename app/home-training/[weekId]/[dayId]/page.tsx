import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { homeProgram, Exercise } from "@/lib/home-workouts"
import { Home, ArrowLeft } from "lucide-react"

interface DayPageProps {
  params: {
    weekId: string
    dayId: string
  }
}

export default async function HomeDayPage({ params }: DayPageProps) {
  const weekNumber = parseInt(params.weekId.replace('week-', ''))
  console.log("Day Page - Parsed weekNumber:", weekNumber)
  const dayName = params.dayId.replace('day-', '').replace(/-/g, " ") // Extract day and convert hyphens to spaces
  console.log("Day Page - Parsed dayName:", dayName)

  const weekData = homeProgram.find((week) => week.week === weekNumber)
  console.log("Day Page - Found weekData:", weekData)
  const workoutDay = weekData?.workouts.find((workout) => workout.day.toLowerCase() === dayName)
  console.log("Day Page - Found workoutDay:", workoutDay)

  if (!workoutDay) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Workout for {dayName} in Week {weekNumber} Not Found</h1>
        <p className="text-muted-foreground mt-4">Please select a valid day and week.</p>
        <Button asChild className="mt-6">
          <Link href={`/home-training/week-${weekNumber}`}>Back to Week {weekNumber}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">WEEK {weekNumber} - {workoutDay.day.toUpperCase()}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Focus: {workoutDay.focus}
          </p>
          <Button asChild variant="outline">
            <Link href={`/home-training/week-${weekNumber}`}>
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
                  <Home className="h-5 w-5 text-secondary" />
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
