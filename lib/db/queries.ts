import { db } from "./index"
import { users, userProgress, workoutLogs, userPreferences, passwordResetTokens, exercises } from "./schema"
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

export async function deletePasswordResetToken(token: string) {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token))
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
