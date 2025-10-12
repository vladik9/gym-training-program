import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Home, TrendingUp, AlertCircle } from "lucide-react"
import { getAllPrograms, getWeeksByProgramId, getWorkoutDaysByWeekId } from "@/lib/db/queries"
import { Program, Week, WorkoutDay } from "@/lib/db/schema"

export default async function HomeTrainingPage() {
  const programs = await getAllPrograms()
  const homeProgram = programs.find(p => p.type === "home")

  if (!homeProgram) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">Home Training Program Not Found</h1>
        <p className="text-muted-foreground mt-4">Please ensure the home program is seeded in the database.</p>
      </div>
    )
  }

  const weeks: (Week & { workoutDays: WorkoutDay[] })[] = []
  const programWeeks = await getWeeksByProgramId(homeProgram.id)

  for (const week of programWeeks) {
    const workoutDays = await getWorkoutDaysByWeekId(week.id)
    weeks.push({ ...week, workoutDays })
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">{homeProgram.name.toUpperCase()}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            {homeProgram.description}
          </p>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8 text-pretty">
            Build strength at home with pull-ups, dips, and minimal equipment. Sweat, pain, and hard work won't stop
            you!
          </p>

          {/* Strength Test Card */}
          <Card className="max-w-3xl mx-auto border-accent/50 bg-accent/5 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
                Before Starting: Strength Test
              </CardTitle>
              <CardDescription>Track your starting point to measure progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-left">
                {/* Assuming strengthTest is still static or fetched separately */}
                {/* {strengthTest.initial.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.exercise}</p>
                      {item.sets !== "-" && <p className="text-sm text-muted-foreground">{item.sets}</p>}
                    </div>
                  </div>
                ))}
                */}
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-foreground/90 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {/* {strengthTest.note} */}
                  Note: Strength test data needs to be fetched or managed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeks.map((week) => (
            <Card key={week.id} className="h-full transition-all hover:scale-105 hover:border-secondary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-lg px-3 py-1 border-secondary text-secondary">
                    Week {week.weekNumber}
                  </Badge>
                  <Home className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle>Week {week.weekNumber} Training</CardTitle>
                <CardDescription>
                  {week.weekNumber === 8 ? "Final Strength Test" : `${week.workoutDays.length} workout days`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`week-${week.weekNumber}`}>
                    <AccordionTrigger className="text-base">View Workout Days</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 mt-2">
                        {week.workoutDays.map((workoutDay, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="font-semibold text-secondary">{workoutDay.dayName}:</span>
                            <span className="text-muted-foreground ml-2">{workoutDay.focus}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button asChild className="w-full mt-4">
                  <Link href={`/home-training/week-${week.weekNumber}`}>
                    View Week {week.weekNumber}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Motivation Section */}
        <div className="mt-16 text-center">
          <Card className="border-primary/50 bg-primary/5 max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-primary mb-4">Let's go, champ!</p>
              <p className="text-lg text-foreground/90">
                Your upcoming two months are filled with strength, health, and progress through home workouts. Don't
                hesitate!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
