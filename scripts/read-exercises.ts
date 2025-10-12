import { db } from "../lib/db/index.ts"
import { exercises } from "../lib/db/schema.ts"

async function readExercises() {
  const allExercises = await db.select().from(exercises)
  console.log("--- All Exercises with IDs ---")
  allExercises.forEach(ex => {
    console.log(`ID: ${ex.id}, Name: ${ex.name}`)
  })
  console.log("------------------------------")
}

readExercises()
