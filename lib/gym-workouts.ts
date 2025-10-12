export interface Exercise {
  id?: number
  name: string
  sets: string
  notes?: string
}

export interface WorkoutDay {
  day: string
  focus: string
  exercises: Exercise[]
}

export interface WeekProgram {
  week: number
  workouts: WorkoutDay[]
}

export const gymProgram: WeekProgram[] = [
  {
    week: 1,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 1, name: "Barbell squats (high trap bar)", sets: "3x12" },
          { id: 2, name: "Leg press (low foot placement)", sets: "2x15" },
          { id: 3, name: "Deadlift with dumbbells (pause for 1 sec at the bottom)", sets: "3x8" },
          { id: 4, name: "Single-leg squats (with or without support)", sets: "3x10" },
          { id: 5, name: "Jumping jacks to maximum height (jump as high as possible)", sets: "4x10" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Chest, Biceps, Shoulders",
        exercises: [
          { id: 6, name: "Bench press with 2 sec pause at the bottom", sets: "3x10" },
          { id: 7, name: "Dips (with or without additional weight)", sets: "3x10" },
          { id: 8, name: "Incline dumbbell press (45°)", sets: "3x8" },
          { id: 9, name: "Prayer bench press", sets: "3x15" },
          { id: 10, name: "Hammer curls", sets: "3x8" },
          { id: 11, name: "Dumbbell curls with supination on incline bench (45°)", sets: "3x10" },
          { id: 12, name: "Standing arm swings", sets: "2x20" },
        ],
      },
      {
        day: "Friday",
        focus: "Back, Triceps",
        exercises: [
          { id: 13, name: "Deadlift (sumo or conventional, whichever is more comfortable)", sets: "3x10" },
          { id: 14, name: "Bent-over barbell row", sets: "2x10" },
          { id: 15, name: "Wide-grip lat pulldown", sets: "3x10" },
          { id: 16, name: "Dumbbell rows on bench", sets: "3x12" },
          { id: 17, name: "Dumbbell shrugs", sets: "3x12" },
          { id: 18, name: "Triceps extensions with cable machine", sets: "3x12" },
        ],
      },
    ],
  },
  {
    week: 2,
    workouts: [
      {
        day: "Monday",
        focus: "Legs, Shoulders",
        exercises: [
          { id: 19, name: "Barbell squats", sets: "2x8" },
          { id: 20, name: "Barbell squats with pause at the bottom", sets: "2x7" },
          { id: 21, name: "Leg press with wide and high stance", sets: "4x12" },
          { id: 22, name: "Walking lunges with dumbbells for each leg", sets: "3x10" },
          { id: 23, name: "Seated dumbbell front raises", sets: "3x10" },
          { id: 24, name: "Seated dumbbell lateral raises", sets: "3x15" },
          { id: 25, name: "Standing barbell shoulder press", sets: "3x8" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Chest, Triceps",
        exercises: [
          { id: 26, name: "Incline bench press (30°)", sets: "3x10" },
          { id: 27, name: "Dumbbell bench press", sets: "3x10" },
          { id: 28, name: "Cable crossovers", sets: "3x12" },
          { id: 29, name: "Close-grip bench press", sets: "3x8" },
          { id: 30, name: "Max push-ups", sets: "1 set" },
        ],
      },
      {
        day: "Friday",
        focus: "Back, Biceps",
        exercises: [
          { id: 31, name: "Box deadlift (3-5 cm height)", sets: "3x8" },
          { id: 32, name: "Deadlift", sets: "2x3" },
          { id: 33, name: "Pull-ups (or lat pulldown)", sets: "3x10" },
          { id: 34, name: "Dumbbell rows in bent-over position", sets: "3x10" },
          { id: 35, name: "Seated dumbbell shrugs", sets: "3x10" },
          { id: 36, name: "Straight barbell curls", sets: "3x12" },
          { id: 37, name: "Reverse grip barbell curls", sets: "2x15" },
        ],
      },
    ],
  },
  {
    week: 3,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 19, name: "Barbell squats", sets: "4x6" },
          { id: 38, name: "Front squats", sets: "2x10" },
          { id: 39, name: "Deadlifts", sets: "3x10" },
          { id: 40, name: "Leg press with pause at the bottom for 3 sec", sets: "3x8" },
          { id: 41, name: "Jumping jacks to maximum height", sets: "3x10" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Chest",
        exercises: [
          { id: 27, name: "Dumbbell bench press", sets: "3x8" },
          { id: 42, name: "Close-grip barbell bench press", sets: "2x10" },
          { id: 43, name: "Parallel bar dips (weighted if possible)", sets: "3x8" },
          { id: 44, name: "Flyes", sets: "4x12" },
          { id: 45, name: "Plate press", sets: "2x20" },
        ],
      },
      {
        day: "Friday",
        focus: "Back",
        exercises: [
          { id: 39, name: "Deadlifts", sets: "3x7" },
          { id: 46, name: "Rack pulls with the bar resting 3-5 cm above the knee", sets: "2x9" },
          { id: 47, name: "Seated cable rows", sets: "3x10" },
          { id: 48, name: "Wide-grip lat pulldowns", sets: "3x10" },
          { id: 49, name: "Straight-arm pulldowns", sets: "4x12" },
        ],
      },
      {
        day: "Saturday",
        focus: "Arms and Shoulders",
        exercises: [
          { id: 10, name: "Hammer curls", sets: "3x8" },
          { id: 50, name: "Wide-grip barbell curls", sets: "3x8" },
          { id: 51, name: "Skull crushers", sets: "3x8" },
          { id: 52, name: "Incline dumbbell triceps extensions", sets: "4x12" },
          { id: 24, name: "Seated dumbbell lateral raises", sets: "4x15" },
        ],
      },
    ],
  },
  {
    week: 4,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 53, name: "Squats", sets: "5x5" },
          { id: 54, name: "Leg press (pause for 3 seconds at the bottom)", sets: "3x8" },
          { id: 55, name: "Front squats with dumbbell", sets: "4x12" },
          { id: 56, name: "Long jumps (important not to use too much weight, focus on feeling the movement)", sets: "3x8" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Bench press",
        exercises: [
          { id: 57, name: "Bench press", sets: "5x5" },
          { id: 58, name: "Narrow dumbbell press", sets: "3x10" },
          { id: 59, name: "Incline flyes (30°)", sets: "3x12" },
          { id: 28, name: "Cable crossovers", sets: "4x15" },
          { id: 60, name: "Triceps pushdowns", sets: "3x12" },
{ id: 61, name: "Close grip bench press, 3 seconds down and 1 second up (important to do with a spotter)", sets: "3x5" }
        ],
      },
      {
        day: "Friday",
        focus: "Back and Biceps",
        exercises: [
          { id: 32, name: "Deadlift", sets: "5x5" },
          { id: 62, name: "Pull-ups (or cable pulldowns)", sets: "4x8" },
          { id: 63, name: "Horizontal cable rows", sets: "4x10" },
          { id: 64, name: "Bent-over barbell rows", sets: "3x10" },
          { id: 65, name: "Weighted hyperextensions", sets: "3x10" },
        ],
      },
    ],
  },
  {
    week: 5,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 53, name: "Squats", sets: "4x4" },
{ id: 66, name: "Leg press", sets: "3x10" },
          { id: 67, name: "High jumps", sets: "4x12" },
          { id: 68, name: "Single-leg squats (can be done with support)", sets: "2x10" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Chest",
        exercises: [
          { id: 57, name: "Bench press", sets: "4x4" },
          { id: 69, name: "Bench press with a 4-second pause at the bottom", sets: "3x3" },
          { id: 27, name: "Dumbbell bench press", sets: "3x12" },
          { id: 70, name: "Pullover", sets: "3x12" },
          { id: 71, name: "Floor presses", sets: "2x max" },
        ],
      },
      {
        day: "Friday",
        focus: "Back and Legs",
        exercises: [
{ id: 66, name: "Leg press", sets: "3x10" },
          { id: 72, name: "Cable rows with a 2-second pause at the top", sets: "5x8" },
          { id: 73, name: "Vertical jumps", sets: "3x10" },
        ],
      },
    ],
  },
  {
    week: 6,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 53, name: "Squats", sets: "3x3" },
          { id: 74, name: "Trap bar squats", sets: "3x10" },
          { id: 66, name: "Leg press", sets: "3x10" },
          { id: 75, name: "Sumo squats with dumbbells on chest", sets: "3x10" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Chest",
        exercises: [
          { id: 57, name: "Bench press", sets: "3x3" },
          { id: 76, name: "Incline bench press (45°)", sets: "3x8" },
          { id: 77, name: "Standing barbell press", sets: "3x6" },
          { id: 78, name: "Incline dumbbell press (40°)", sets: "4x15" },
        ],
      },
      {
        day: "Friday",
        focus: "Back",
        exercises: [
          { id: 32, name: "Deadlift", sets: "3x3" },
          { id: 79, name: "Reverse-grip bent-over rows", sets: "3x8" },
          { id: 80, name: "Lat pulldowns", sets: "3x10" },
          { id: 81, name: "T-bar rows", sets: "4x10" },
          { id: 82, name: "Shrugs with barbell", sets: "4x10" },
        ],
      },
    ],
  },
  {
    week: 7,
    workouts: [
      {
        day: "Monday",
        focus: "Legs and Shoulders",
        exercises: [
          { id: 53, name: "Squats", sets: "3x3" },
          { id: 38, name: "Front squats", sets: "3x12" },
          { id: 83, name: "Sumo leg press", sets: "3x10" },
          { id: 77, name: "Standing barbell press", sets: "3x6" },
          { id: 84, name: "Seated dumbbell press", sets: "3x10" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Chest and Triceps",
        exercises: [
          { id: 57, name: "Bench press", sets: "2x2" },
          { id: 85, name: "Incline dumbbell press (30°)", sets: "3x10" },
          { id: 86, name: "Dips", sets: "3x15" },
          { id: 87, name: "Dumbbell French press on incline bench (30°)", sets: "3x12" },
          { id: 88, name: "Cable triceps extensions", sets: "4x12" },
        ],
      },
      {
        day: "Friday",
        focus: "Back and Biceps",
        exercises: [
          { id: 32, name: "Deadlift", sets: "2x2" },
          { id: 89, name: "Bent-over rows with barbell", sets: "3x8" },
          { id: 90, name: "Bent-over rows with dumbbells", sets: "3x10" },
          { id: 91, name: "Pull-ups", sets: "3x10" },
          { id: 92, name: "Reverse-grip barbell curls", sets: "3x10" },
          { id: 93, name: "Bicep curls on cable machine", sets: "3x20" },
        ],
      },
    ],
  },
  {
    week: 8,
    workouts: [
      {
        day: "Monday",
        focus: "Legs and Shoulders",
        exercises: [
          { id: 94, name: "Squats (record)", sets: "1x1", notes: "Test your max!" },
          { id: 53, name: "Squats", sets: "3x12" },
          { id: 66, name: "Leg press", sets: "3x15" },
          { id: 95, name: "Lateral raises with dumbbells", sets: "4x12" },
          { id: 96, name: "Standing dumbbell press", sets: "3x12" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Chest and Biceps",
        exercises: [
          { id: 97, name: "Bench press (record)", sets: "1x1", notes: "Test your max!" },
          { id: 57, name: "Bench press", sets: "3x10" },
          { id: 98, name: "Incline dumbbell press", sets: "3x10" },
          { id: 10, name: "Hammer curls", sets: "5x5" },
          { id: 99, name: "Single-arm cable curls", sets: "3x10" },
          { id: 100, name: "Diamond push-ups", sets: "2x max" },
        ],
      },
      {
        day: "Saturday",
        focus: "Deadlift",
        exercises: [
          { id: 101, name: "Bent-over rows", sets: "1x max", notes: "Test your endurance!" },
          { id: 101, name: "Bent-over rows", sets: "3x8" },
          { id: 80, name: "Lat pulldowns", sets: "5x10" },
          { id: 102, name: "Tricep extensions on cable machine", sets: "3x12" },
          { id: 103, name: "Dumbbell French press on flat bench", sets: "3x10" },
        ],
      },
    ],
  },
]

export const restGuidelines = {
  basicExercise: "4 min (squat/bench press/deadlift)",
  otherSets: "2 min",
  betweenExercises: "3 min",
}
