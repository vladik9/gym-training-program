import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getWeekById, getWorkoutDaysByWeekId } from "@/lib/db/queries"
import { Week, WorkoutDay } from "@/lib/db/schema"
import { Home, ArrowLeft } from "lucide-react"

interface WeekPageProps {
  params: {
    weekId: string
  }
}

export default async function HomeWeekPage({ params }: WeekPageProps) {
  const weekNumber = parseInt(params.weekId.replace('week-', ''))

  // Fetch the week data from the database
  const weekData: (Week & { workoutDays: WorkoutDay[] }) | undefined = await getWeekById(weekNumber)

  if (!weekData) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Week {weekNumber} Not Found</h1>
        <p className="text-muted-foreground mt-4">Please select a valid week from the program.</p>
        <Button asChild className="mt-6">
          <Link href="/home-training">Back to Home Training</Link>
        </Button>
      </div>
    )
  }

  // Fetch workout days for this week
  weekData.workoutDays = await getWorkoutDaysByWeekId(weekData.id)

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">HOME TRAINING - WEEK {weekData.weekNumber}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Overview of your workouts for Week {weekData.weekNumber}
          </p>
          <Button asChild variant="outline">
            <Link href={`/home-training/week-${weekData.weekNumber}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Weeks
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weekData.workoutDays.map((workoutDay) => (
            <Link key={workoutDay.id} href={`/home-training/week-${weekData.weekNumber}/day-${workoutDay.dayName.toLowerCase().replace(/ /g, '-')}`} className="group">
              <Card className="h-full transition-all hover:scale-105 hover:border-secondary">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-lg px-3 py-1 border-secondary text-secondary">
                      {workoutDay.dayName}
                    </Badge>
                    <Home className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle>{workoutDay.focus} Workout</CardTitle>
                  <CardDescription>View exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full mt-4 group-hover:bg-secondary group-hover:text-secondary-foreground bg-transparent"
                    variant="outline"
                  >
                    View {workoutDay.dayName} Workout
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