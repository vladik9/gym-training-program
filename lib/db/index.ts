import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import * as schema from "./schema.ts"

const sqlite = new Database("gym-app.db")
export const db = drizzle(sqlite, { schema })

// Initialize database with tables
let isDatabaseInitialized = false;
export function initializeDatabase() {
  if (isDatabaseInitialized) {
    return;
  }
  // Create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      exercise_type TEXT NOT NULL,
      weight REAL,
      reps INTEGER,
      is_initial INTEGER NOT NULL DEFAULT 0,
      is_final INTEGER NOT NULL DEFAULT 0,
      recorded_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workout_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      program_type TEXT NOT NULL,
      week INTEGER NOT NULL,
      day TEXT NOT NULL,
      exercise_name TEXT NOT NULL,
      sets_completed INTEGER NOT NULL,
      reps_completed TEXT NOT NULL,
      weight REAL,
      notes TEXT,
      completed_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      current_program TEXT,
      current_week INTEGER DEFAULT 1,
      weight_unit TEXT NOT NULL DEFAULT 'kg',
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      equipment TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      description TEXT NOT NULL,
      instructions TEXT NOT NULL,
      muscles_worked TEXT NOT NULL,
      video_url TEXT,
      gif_url TEXT,
      tips TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS weeks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      program_id INTEGER NOT NULL,
      week_number INTEGER NOT NULL,
      description TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workout_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week_id INTEGER NOT NULL,
      day_name TEXT NOT NULL,
      focus TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workout_day_exercises (
      workout_day_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      sets TEXT NOT NULL,
      notes TEXT,
      "order" INTEGER NOT NULL,
      FOREIGN KEY (workout_day_id) REFERENCES workout_days(id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
      PRIMARY KEY (workout_day_id, exercise_id, "order")
    );
  `)

  console.log("[v0] Database initialized successfully")
  isDatabaseInitialized = true;
}

initializeDatabase(); // Call it once when the module is loaded
