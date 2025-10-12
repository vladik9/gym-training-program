import { getExerciseById } from "@/lib/db/queries"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Dumbbell, Youtube } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ExercisePageProps {
  params: {
    id: string
  }
}

export default async function ExercisePage({ params }: ExercisePageProps) {
  const exerciseId = parseInt(params.id)
  const exercise = await getExerciseById(exerciseId)

  if (!exercise) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h1 className="text-4xl font-bold mb-4">Exercise Not Found</h1>
        <p className="text-muted-foreground mb-6">The exercise you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/gym-training">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Training
            </Link>
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-bold flex items-center gap-3">
              <Dumbbell className="h-8 w-8 text-primary" />
              {exercise.name}
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Category: {exercise.category} | Equipment: {exercise.equipment} | Difficulty: {exercise.difficulty}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {exercise.gifUrl && (
              <div className="w-full rounded-lg overflow-hidden">
                <Image
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  width={600}
                  height={400}
                  layout="responsive"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            )}

            {exercise.videoUrl && (
              <div className="w-full rounded-lg overflow-hidden">
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={exercise.videoUrl}
                  title={`${exercise.name} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div>
              <h3 className="text-2xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{exercise.description}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
              <p className="text-muted-foreground">{exercise.instructions}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Muscles Worked</h3>
              <p className="text-muted-foreground">{exercise.musclesWorked}</p>
            </div>

            {exercise.tips && (
              <div>
                <h3 className="text-2xl font-semibold mb-2">Tips</h3>
                <p className="text-muted-foreground">{exercise.tips}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
