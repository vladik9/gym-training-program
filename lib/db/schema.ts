import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

// Users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// User progress tracking
export const userProgress = sqliteTable("user_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  exerciseType: text("exercise_type").notNull(), // 'squat', 'bench', 'deadlift', 'pullup', 'dip', 'pushup'
  weight: real("weight"), // in kg or lbs
  reps: integer("reps"),
  isInitial: integer("is_initial", { mode: "boolean" }).notNull().default(false),
  isFinal: integer("is_final", { mode: "boolean" }).notNull().default(false),
  recordedAt: integer("recorded_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// Workout logs
export const workoutLogs = sqliteTable("workout_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  programType: text("program_type").notNull(), // 'gym' or 'home'
  week: integer("week").notNull(),
  day: text("day").notNull(),
  exerciseName: text("exercise_name").notNull(),
  setsCompleted: integer("sets_completed").notNull(),
  repsCompleted: text("reps_completed").notNull(), // JSON string of reps per set
  weight: real("weight"), // weight used
  notes: text("notes"),
  completedAt: integer("completed_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// User preferences
export const userPreferences = sqliteTable("user_preferences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  currentProgram: text("current_program"), // 'gym' or 'home'
  currentWeek: integer("current_week").default(1),
  weightUnit: text("weight_unit").notNull().default("kg"), // 'kg' or 'lbs'
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// Password reset tokens
export const passwordResetTokens = sqliteTable("password_reset_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// Exercise library
export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'legs', 'chest', 'back', 'shoulders', 'arms', 'core'
  equipment: text("equipment").notNull(), // 'barbell', 'dumbbell', 'bodyweight', 'cable', 'machine'
  difficulty: text("difficulty").notNull(), // 'beginner', 'intermediate', 'advanced'
  description: text("description").notNull(),
  instructions: text("instructions").notNull(), // JSON string of step-by-step instructions
  musclesWorked: text("muscles_worked").notNull(), // JSON string of muscle groups
  videoUrl: text("video_url"),
  gifUrl: text("gif_url"),
  tips: text("tips"), // JSON string of tips
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// Types for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserProgress = typeof userProgress.$inferSelect
export type NewUserProgress = typeof userProgress.$inferInsert
export type WorkoutLog = typeof workoutLogs.$inferSelect
export type NewWorkoutLog = typeof workoutLogs.$inferInsert
export type UserPreference = typeof userPreferences.$inferSelect
export type NewUserPreference = typeof userPreferences.$inferInsert
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert
export type Exercise = typeof exercises.$inferSelect
export type NewExercise = typeof exercises.$inferInsert

// Programs table
export const programs = sqliteTable("programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'gym' or 'home'
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// Weeks table
export const weeks = sqliteTable("weeks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  programId: integer("program_id")
    .notNull()
    .references(() => programs.id, { onDelete: "cascade" }),
  weekNumber: integer("week_number").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// Workout Days table
export const workoutDays = sqliteTable("workout_days", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  weekId: integer("week_id")
    .notNull()
    .references(() => weeks.id, { onDelete: "cascade" }),
  dayName: text("day_name").notNull(), // e.g., 'Monday', 'Wednesday'
  focus: text("focus").notNull(), // e.g., 'Legs', 'Chest, Biceps, Shoulders'
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

// Junction table for WorkoutDay and Exercise (many-to-many)
export const workoutDayExercises = sqliteTable("workout_day_exercises", {
  workoutDayId: integer("workout_day_id")
    .notNull()
    .references(() => workoutDays.id, { onDelete: "cascade" }),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  sets: text("sets").notNull(),
  notes: text("notes"),
  order: integer("order").notNull(), // To maintain exercise order within a day
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.workoutDayId, table.exerciseId, table.order] }),
  }
})

// Types for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserProgress = typeof userProgress.$inferSelect
export type NewUserProgress = typeof userProgress.$inferInsert
export type WorkoutLog = typeof workoutLogs.$inferSelect
export type NewWorkoutLog = typeof workoutLogs.$inferInsert
export type UserPreference = typeof userPreferences.$inferSelect
export type NewUserPreference = typeof userPreferences.$inferInsert
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert
export type Exercise = typeof exercises.$inferSelect
export type NewExercise = typeof exercises.$inferInsert

export type Program = typeof programs.$inferSelect
export type NewProgram = typeof programs.$inferInsert
export type Week = typeof weeks.$inferSelect
export type NewWeek = typeof weeks.$inferInsert
export type WorkoutDay = typeof workoutDays.$inferSelect
export type NewWorkoutDay = typeof workoutDays.$inferInsert
export type WorkoutDayExercise = typeof workoutDayExercises.$inferSelect
export type NewWorkoutDayExercise = typeof workoutDayExercises.$inferInsert

