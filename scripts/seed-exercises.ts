import { db, initializeDatabase } from "../lib/db/index.ts"
import { exercises, type NewExercise } from "../lib/db/schema.ts"
import { gymProgram } from "../lib/gym-workouts.ts"
import { homeProgram } from "../lib/home-workouts.ts"

async function seedExercises() {
  console.log("Seeding exercises...")
  initializeDatabase()

  const allExercises: NewExercise[] = []
  const uniqueExerciseNames = new Set<string>()
  let currentId = 1

  // Process gym program exercises
  for (const week of gymProgram) {
    for (const workout of week.workouts) {
      for (const exercise of workout.exercises) {
        if (!uniqueExerciseNames.has(exercise.name)) {
          uniqueExerciseNames.add(exercise.name)
          allExercises.push({
            id: currentId,
            name: exercise.name,
            category: workout.focus, // Using workout focus as category for now
            equipment: "Gym Equipment", // Placeholder
            difficulty: "Intermediate", // Placeholder
            description: `Description for ${exercise.name}`,
            instructions: `Instructions for ${exercise.name}`,
            musclesWorked: `Muscles worked by ${exercise.name}`,
            videoUrl: null,
            gifUrl: null,
            tips: null,
          })
          exercise.id = currentId // Assign ID to the in-memory object
          currentId++
        } else {
          // If exercise already exists, find its ID and assign it
          const existingExercise = allExercises.find((e) => e.name === exercise.name)
          if (existingExercise) {
            exercise.id = existingExercise.id
          }
        }
      }
    }
  }

  // Process home program exercises
  for (const week of homeProgram) {
    for (const workout of week.workouts) {
      for (const exercise of workout.exercises) {
        if (!uniqueExerciseNames.has(exercise.name)) {
          uniqueExerciseNames.add(exercise.name)
          allExercises.push({
            id: currentId,
            name: exercise.name,
            category: workout.focus, // Using workout focus as category for now
            equipment: "Bodyweight", // Placeholder
            difficulty: "Beginner", // Placeholder
            description: `Description for ${exercise.name}`,
            instructions: `Instructions for ${exercise.name}`,
            musclesWorked: `Muscles worked by ${exercise.name}`,
            videoUrl: null,
            gifUrl: null,
            tips: null,
          })
          exercise.id = currentId // Assign ID to the in-memory object
          currentId++
        } else {
          // If exercise already exists, find its ID and assign it
          const existingExercise = allExercises.find((e) => e.name === exercise.name)
          if (existingExercise) {
            exercise.id = existingExercise.id
          }
        }
      }
    }
  }

  try {
    // Clear existing exercises and insert new ones
    await db.delete(exercises)
    await db.insert(exercises).values(allExercises)
    console.log(`Seeded ${allExercises.length} unique exercises.`)
  } catch (error) {
    console.error("Error seeding exercises:", error)
  }
}

seedExercises()