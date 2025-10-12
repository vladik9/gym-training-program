import { getAllExercises } from "@/lib/db/queries"
import ExercisesClientPage from "./exercises-client-page"

export default async function ExercisesPage() {
  const exercises = await getAllExercises()

  return <ExercisesClientPage exercises={exercises} />
}
