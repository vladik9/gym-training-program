import { db, initializeDatabase } from "../lib/db/index.ts"
import { programs, weeks, workoutDays, workoutDayExercises, exercises } from "../lib/db/schema.ts"
import { gymProgram as staticGymProgram } from "../lib/gym-workouts.ts"
import { homeProgram as staticHomeProgram } from "../lib/home-workouts.ts"

async function seedPrograms() {
  console.log("Seeding programs, weeks, and workout days...")
  initializeDatabase()

  try {
    // Clear existing program data to prevent duplicates on re-run
    await db.delete(workoutDayExercises)
    await db.delete(workoutDays)
    await db.delete(weeks)
    await db.delete(programs)

    // Insert Gym Program
    const [gymProgram] = await db.insert(programs).values({
      name: "Gym Training Program",
      description: "8 Weeks of Powerbuilding - Strength & Aesthetics",
      type: "gym",
    }).returning()

    for (const staticWeek of staticGymProgram) {
      const [week] = await db.insert(weeks).values({
        programId: gymProgram.id,
        weekNumber: staticWeek.week,
        description: `Week ${staticWeek.week} of Gym Training`,
      }).returning()

      for (const staticWorkout of staticWeek.workouts) {
        const [workoutDay] = await db.insert(workoutDays).values({
          weekId: week.id,
          dayName: staticWorkout.day,
          focus: staticWorkout.focus,
        }).returning()

        let order = 0
        for (const staticExercise of staticWorkout.exercises) {
          // Ensure exercise exists in the exercises table
          const existingExercise = await db.query.exercises.findFirst({
            where: (exercises, { eq }) => eq(exercises.name, staticExercise.name)
          })

          if (existingExercise) {
            await db.insert(workoutDayExercises).values({
              workoutDayId: workoutDay.id,
              exerciseId: existingExercise.id,
              sets: staticExercise.sets,
              notes: staticExercise.notes,
              order: order++,
            })
          } else {
            console.warn(`Exercise not found in DB: ${staticExercise.name}. Skipping for workout day ${workoutDay.id}`)
          }
        }
      }
    }

    // Insert Home Program
    const [homeProgram] = await db.insert(programs).values({
      name: "Home Training Program",
      description: "8 Weeks of Bodyweight & Calisthenics Training",
      type: "home",
    }).returning()

    for (const staticWeek of staticHomeProgram) {
      const [week] = await db.insert(weeks).values({
        programId: homeProgram.id,
        weekNumber: staticWeek.week,
        description: `Week ${staticWeek.week} of Home Training`,
      }).returning()

      for (const staticWorkout of staticWeek.workouts) {
        const [workoutDay] = await db.insert(workoutDays).values({
          weekId: week.id,
          dayName: staticWorkout.day,
          focus: staticWorkout.focus,
        }).returning()

        let order = 0
        for (const staticExercise of staticWorkout.exercises) {
          // Ensure exercise exists in the exercises table
          const existingExercise = await db.query.exercises.findFirst({
            where: (exercises, { eq }) => eq(exercises.name, staticExercise.name)
          })

          if (existingExercise) {
            await db.insert(workoutDayExercises).values({
              workoutDayId: workoutDay.id,
              exerciseId: existingExercise.id,
              sets: staticExercise.sets,
              notes: staticExercise.notes,
              order: order++,
            })
          } else {
            console.warn(`Exercise not found in DB: ${staticExercise.name}. Skipping for workout day ${workoutDay.id}`)
          }
        }
      }
    }

    console.log("Programs, weeks, and workout days seeded successfully.")
  } catch (error) {
    console.error("Error seeding programs:", error)
  }
}

seedPrograms()
