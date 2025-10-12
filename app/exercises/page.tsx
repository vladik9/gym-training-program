import Link from "next/link"
import { getAllExercises } from "@/lib/db/queries"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell } from "lucide-react"

export default async function ExercisesListPage() {
  const exercises = await getAllExercises()

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-balance">All Exercises</h1>
          <p className="text-xl text-muted-foreground mb-6 text-balance">
            Browse through our comprehensive exercise library.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <Link key={exercise.id} href={`/exercises/${exercise.id}`} className="group">
              <Card className="h-full transition-all hover:scale-105 hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    {exercise.name}
                  </CardTitle>
                  <CardDescription>
                    {exercise.category} | {exercise.equipment}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {exercise.description}
                  </p>
                  <Button
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                    variant="outline"
                  >
                    View Details
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
