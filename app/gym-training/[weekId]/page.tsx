import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { gymProgram } from "@/lib/gym-workouts"
import { Dumbbell, ArrowLeft } from "lucide-react"

interface WeekPageProps {
  params: {
    weekId: string
  }
}

export default function GymWeekPage({ params }: WeekPageProps) {
  const weekNumber = parseInt(params.weekId.replace('week-', ''))
  console.log("Parsed weekNumber:", weekNumber)
  const weekData = gymProgram.find((week) => week.week === weekNumber)
  console.log("Found weekData:", weekData)

  if (!weekData) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Week {weekNumber} Not Found</h1>
        <p className="text-muted-foreground mt-4">Please select a valid week from the program.</p>
        <Button asChild className="mt-6">
          <Link href="/gym-training">Back to Gym Training</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">GYM TRAINING - WEEK {weekNumber}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Overview of your workouts for Week {weekNumber}
          </p>
          <Button asChild variant="outline">
            <Link href={`/gym-training/${params.weekId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Week {weekNumber}
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weekData.workouts.map((workout, idx) => (
            <Link key={idx} href={`/gym-training/${params.weekId}/day-${workout.day.toLowerCase()}`} className="group">
              <Card className="h-full transition-all hover:scale-105 hover:border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {workout.day}
                    </Badge>
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{workout.focus} Workout</CardTitle>
                  <CardDescription>{workout.exercises.length} exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {workout.exercises.slice(0, 3).map((exercise, exIdx) => (
                      <li key={exIdx}>{exercise.name} ({exercise.sets}){exercise.notes && ` - ${exercise.notes}`}</li>
                    ))}
                    {workout.exercises.length > 3 && <li>...and more</li>}
                  </ul>
                  <Button
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                    variant="outline"
                  >
                    View {workout.day} Workout
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}