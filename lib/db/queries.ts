import { db } from "./index"
import { users, userProgress, workoutLogs, userPreferences, passwordResetTokens, exercises, programs, weeks, workoutDays } from "./schema"
import { eq, and, desc } from "drizzle-orm"
import bcrypt from "bcryptjs"

// User queries
export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const [user] = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      name,
    })
    .returning()
  return user
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email))
  return user
}

export async function getUserById(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id))
  return user
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

// Progress queries
export async function saveProgress(
  userId: number,
  exerciseType: string,
  weight: number | null,
  reps: number | null,
  isInitial: boolean,
  isFinal: boolean,
) {
  const [progress] = await db
    .insert(userProgress)
    .values({
      userId,
      exerciseType,
      weight,
      reps,
      isInitial,
      isFinal,
    })
    .returning()
  return progress
}

export async function getUserProgress(userId: number) {
  return db.select().from(userProgress).where(eq(userProgress.userId, userId)).orderBy(desc(userProgress.recordedAt))
}

export async function getInitialProgress(userId: number) {
  return db
    .select()
    .from(userProgress)
    .where(and(eq(userProgress.userId, userId), eq(userProgress.isInitial, true)))
}

export async function getFinalProgress(userId: number) {
  return db
    .select()
    .from(userProgress)
    .where(and(eq(userProgress.userId, userId), eq(userProgress.isFinal, true)))
}

// Workout log queries
export async function logWorkout(
  userId: number,
  programType: string,
  week: number,
  day: string,
  exerciseName: string,
  setsCompleted: number,
  repsCompleted: string,
  weight: number | null,
  notes: string | null,
) {
  const [log] = await db
    .insert(workoutLogs)
    .values({
      userId,
      programType,
      week,
      day,
      exerciseName,
      setsCompleted,
      repsCompleted,
      weight,
      notes,
    })
    .returning()
  return log
}

export async function getUserWorkoutLogs(userId: number) {
  return db.select().from(workoutLogs).where(eq(workoutLogs.userId, userId)).orderBy(desc(workoutLogs.completedAt))
}

export async function getWorkoutLogsByWeek(userId: number, week: number) {
  return db
    .select()
    .from(workoutLogs)
    .where(and(eq(workoutLogs.userId, userId), eq(workoutLogs.week, week)))
    .orderBy(desc(workoutLogs.completedAt))
}

// User preferences queries
export async function getUserPreferences(userId: number) {
  const [prefs] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId))
  return prefs
}

export async function updateUserPreferences(
  userId: number,
  updates: {
    currentProgram?: string
    currentWeek?: number
    weightUnit?: string
  },
) {
  const [prefs] = await db.update(userPreferences).set(updates).where(eq(userPreferences.userId, userId)).returning()
  return prefs
}

export async function createUserPreferences(userId: number) {
  const [prefs] = await db
    .insert(userPreferences)
    .values({
      userId,
    })
    .returning()
  return prefs
}

// Password reset queries
export async function createPasswordResetToken(userId: number, token: string, expiresAt: Date) {
  const [resetToken] = await db
    .insert(passwordResetTokens)
    .values({
      userId,
      token,
      expiresAt,
    })
    .returning()
  return resetToken
}

export async function getPasswordResetToken(token: string) {
  const [resetToken] = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.token, token))
  return resetToken
}

// Exercise queries
export async function deletePasswordResetToken(token: string) {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token))
}

// Program queries
export async function getAllPrograms() {
  return db.select().from(programs)
}

export async function getProgramById(id: number) {
  const [program] = await db.select().from(programs).where(eq(programs.id, id))
  return program
}

export async function getWeeksByProgramId(programId: number) {
  return db.select().from(weeks).where(eq(weeks.programId, programId)).orderBy(weeks.weekNumber)
}

export async function getWeekById(id: number) {
  const [week] = await db.select().from(weeks).where(eq(weeks.id, id))
  return week
}

export async function getWeekByProgramIdAndWeekNumber(programId: number, weekNumber: number) {
  const [week] = await db.select().from(weeks).where(and(eq(weeks.programId, programId), eq(weeks.weekNumber, weekNumber)))
  return week
}

export async function getWorkoutDaysByWeekId(weekId: number) {
  return db.select().from(workoutDays).where(eq(workoutDays.weekId, weekId)).orderBy(workoutDays.id)
}

export async function getWorkoutDayById(id: number) {
  const [workoutDay] = await db.select().from(workoutDays).where(eq(workoutDays.id, id))
  return workoutDay
}

export async function getWorkoutDayByWeekIdAndDayName(weekId: number, dayName: string) {
  const [workoutDay] = await db.select().from(workoutDays).where(and(eq(workoutDays.weekId, weekId), eq(workoutDays.dayName, dayName)))
  return workoutDay
}

export async function getExercisesForWorkoutDay(workoutDayId: number) {
  return db.select({
    id: exercises.id,
    name: exercises.name,
    sets: workoutDayExercises.sets,
    notes: workoutDayExercises.notes,
    category: exercises.category,
    equipment: exercises.equipment,
    difficulty: exercises.difficulty,
    description: exercises.description,
    instructions: exercises.instructions,
    musclesWorked: exercises.musclesWorked,
    videoUrl: exercises.videoUrl,
    gifUrl: exercises.gifUrl,
    tips: exercises.tips,
  })
  .from(workoutDayExercises)
  .innerJoin(exercises, eq(workoutDayExercises.exerciseId, exercises.id))
  .where(eq(workoutDayExercises.workoutDayId, workoutDayId))
  .orderBy(workoutDayExercises.order)
}

// Exercise queries
export async function getAllExercises() {
  return db.select().from(exercises)
}

export async function getExerciseById(id: number) {
  const [exercise] = await db.select().from(exercises).where(eq(exercises.id, id))
  return exercise
}

export async function getExercisesByCategory(category: string) {
  return db.select().from(exercises).where(eq(exercises.category, category))
}

export async function searchExercises(searchTerm: string) {
  return db.select().from(exercises)
}

export async function createExercise(newExercise: NewExercise) {
  const [exercise] = await db.insert(exercises).values(newExercise).returning()
  return exercise
}

export async function updateExercise(id: number, updatedExercise: Partial<NewExercise>) {
  const [exercise] = await db.update(exercises).set(updatedExercise).where(eq(exercises.id, id)).returning()
  return exercise
}

export async function deleteExercise(id: number) {
  await db.delete(exercises).where(eq(exercises.id, id))
}
