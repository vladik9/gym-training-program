export interface Exercise {
  id?: number;
  name: string;
  sets: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WeekProgram {
  week: number;
  workouts: WorkoutDay[];
}

export const homeProgram: WeekProgram[] = [
  {
    week: 1,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 104, name: "Pistol squats (each leg) - can be done with support", sets: "3x12" },
          { id: 105, name: "Box jumps", sets: "3x10" },
          { id: 106, name: "Step-ups with additional weight on an elevation (each leg)", sets: "3x14" },
          { id: 107, name: "Standing calf raises with additional weight on one leg", sets: "4x20" },
          { id: 108, name: "Chair pose", sets: "1 x max" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + Biceps",
        exercises: [
          { id: 109, name: "Wide-grip pull-ups", sets: "3x10" },
          { id: 110, name: "Reverse-grip pull-ups", sets: "3x8" },
          { id: 111, name: "Single-arm low bar pull-ups", sets: "3x8" },
          { id: 112, name: "Reverse narrow grip low bar pull-ups", sets: "3x8" },
        ],
      },
      {
        day: "Friday",
        focus: "Chest + Triceps",
        exercises: [
          { id: 86, name: "Dips", sets: "3x10" },
          { id: 113, name: "Elevated feet push-ups", sets: "3x12" },
          { id: 114, name: "Close-grip push-ups", sets: "3x12" },
          { id: 115, name: "Archer push-ups", sets: "3x10" },
          { id: 116, name: "French press", sets: "3x8" },
        ],
      },
      {
        day: "Saturday",
        focus: "Abs + Static",
        exercises: [
          { id: 118, name: "Leg raises on parallel bars", sets: "3x12" },
          { id: 119, name: "Crunches", sets: "3x20" },
          { id: 120, name: "Plank", sets: "2x MAX" },
        ],
      },
    ],
  },
  {
    week: 2,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 121, name: "Weighted squats with jump", sets: "3x15" },
          { id: 122, name: "Pistol squats", sets: "3x10" },
          { id: 123, name: "Weighted lunges (each leg)", sets: "3x15" },
          { id: 124, name: "Chair pose with weight", sets: "1x MAX" },
          { id: 125, name: "Single-leg calf raises with weight", sets: "4x25" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + Biceps",
        exercises: [
          { id: 110, name: "Reverse-grip pull-ups", sets: "4x12" },
          { id: 126, name: "Wide-grip alternating pull-ups", sets: "3x8" },
          { id: 127, name: "Close-grip low bar pull-ups", sets: "3x10" },
          { id: 128, name: "Pull-ups behind the neck", sets: "5x6" },
        ],
      },
      {
        day: "Friday",
        focus: "Chest + Triceps",
        exercises: [
          { id: 86, name: "Dips", sets: "4x10" },
          { id: 129, name: "One-leg elevated feet push-ups", sets: "4x10" },
          { id: 130, name: "Triceps push-ups", sets: "4x12" },
          { id: 116, name: "French press", sets: "4x8" },
          { id: 131, name: "Push-ups", sets: "1x Max" },
        ],
      },
      {
        day: "Saturday",
        focus: "Abs + Static",
        exercises: [
          { id: 117, name: "Hanging leg raises", sets: "3x12" },
          { id: 119, name: "Crunches", sets: "3x20" },
          { id: 132, name: "Alternating heel touches", sets: "3x15" },
          { id: 133, name: "Lying leg raises", sets: "3x20" },
          { id: 120, name: "Plank", sets: "2x Max" },
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
          { id: 134, name: "Squats with jump", sets: "3x18" },
          { id: 135, name: "Step-up jumps + Each leg step-ups (combined approach)", sets: "3x10 + 3x12" },
          { id: 136, name: "Chair pose with weight in front", sets: "2x25" },
          { id: 137, name: "Bent-over barbell rows (with weight)", sets: "3x15" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + Biceps",
        exercises: [
          { id: 138, name: "Wide-grip pull-ups with pause", sets: "3x10" },
          { id: 139, name: "Parallel grip pull-ups", sets: "3x10" },
          { id: 140, name: "Low bar pull-ups", sets: "3x12" },
          { id: 141, name: "Low bar parallel grip pull-ups", sets: "3x8" },
        ],
      },
      {
        day: "Friday",
        focus: "Chest + Triceps",
        exercises: [
          { id: 142, name: "Wide-grip dips with a slight forward lean", sets: "3x12" },
          { id: 143, name: "Elevated push-ups", sets: "3x12" },
          { id: 114, name: "Close-grip push-ups", sets: "3x12" },
          { id: 144, name: "Weighted back extensions (using dumbbells, weights, or water bottles) in a bent-over position", sets: "3x10" },
          { id: 116, name: "French press", sets: "3x10" },
        ],
      },
      {
        day: "Saturday",
        focus: "Abs + Static holds",
        exercises: [
          { id: 145, name: "Leg raises on a bar", sets: "3x12" },
          { id: 118, name: "Leg raises on parallel bars", sets: "3x12" },
          { id: 146, name: "Crunches (with knees bent on an elevated surface)", sets: "3x20" },
          { id: 108, name: "Chair pose", sets: "2x Max" },
          { id: 120, name: "Plank", sets: "1x Max" },
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
          { id: 147, name: "Plie squats with added weight between legs (wide stance)", sets: "3x15" },
          { id: 148, name: "Pistol squats with weight", sets: "3x12" },
          { id: 149, name: "Bulgarian split squats", sets: "3x15" },
          { id: 150, name: "Deadlift with added weight", sets: "3x12" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + Biceps",
        exercises: [
          { id: 151, name: "Chin-ups from below", sets: "4x10" },
          { id: 152, name: "Bent-over rows (dumbbells, weights, or water bottles - anything that adds resistance)", sets: "4x12" },
          { id: 153, name: "Horizontal pull-ups", sets: "4x12" },
          { id: 154, name: "Pull-ups behind the head", sets: "4x6" },
        ],
      },
      {
        day: "Friday",
        focus: "Chest + Triceps",
        exercises: [
          { id: 155, name: "Weighted push-ups on the back", sets: "4x10" },
          { id: 156, name: "Wide grip push-ups on parallel bars", sets: "4x10" },
          { id: 157, name: "Reverse dips with straight legs for triceps", sets: "3x12" },
          { id: 116, name: "French press", sets: "4x8" },
          { id: 158, name: "Flyes (dumbbells, weights, or water bottles) with palms facing forward", sets: "3x12" }
        ],
      },
      {
        day: "Saturday",
        focus: "Abs + Static holds",
        exercises: [
          { id: 159, name: "Knee raises on a pull-up bar", sets: "3x10" },
          { id: 160, name: "Sit-ups", sets: "3x20" },
          { id: 161, name: "Alternate heel touches", sets: "3x15" },
          { id: 162, name: "Scissors while lying down", sets: "3x25" },
          { id: 120, name: "Plank", sets: "2x Max" },
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
          { id: 163, name: "Lateral lunges", sets: "3x12" },
          { id: 164, name: "One-legged squats with support (wall or any other vertical support)", sets: "3x8" },
          { id: 165, name: "Standing calf raises with added weight", sets: "3x25" },
          { id: 108, name: "Chair pose", sets: "1x MAX" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + Biceps",
        exercises: [
          { id: 91, name: "Pull-ups", sets: "3x6" },
          {
            id: 166, name: "Dumbbell rows (weights, or water bottles) alternating sides while bent over",
            sets: "3x12",
          },
          { id: 167, name: "Low bar rows", sets: "3x8" },
          {
            id: 168, name: "Shrugs with added weight and shoulder blades pinched together (without circular movements)",
            sets: "3x12",
          },
        ],
      },
      {
        day: "Friday",
        focus: "Chest + Triceps",
        exercises: [
          { id: 169, name: "Flyes (dumbbells, weights, or water bottles - anything that adds resistance) lying down", sets: "3x15" },
          { id: 170, name: "Push-ups with feet elevated", sets: "3x8" },
          { id: 171, name: "Close grip push-ups with feet elevated", sets: "3x15" },
          { id: 115, name: "Archer push-ups", sets: "3x7" },
          { id: 172, name: "Alternating dumbbell triceps extensions behind the head", sets: "3x10" },
        ],
      },
      {
        day: "Saturday",
        focus: "Abs + Static",
        exercises: [
          { id: 173, name: "Hanging knee raises with bent knees (do not lower below parallel)", sets: "3x8" },
          { id: 174, name: "Hanging leg raises with added weight", sets: "3x8" },
          { id: 175, name: "Weighted crunches", sets: "3x15" },
          { id: 176, name: "L-sit", sets: "2x Max" },
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
          { id: 177, name: "Front squats with weight in front (emphasis on negative repetitions)", sets: "3x8" },
          { id: 122, name: "Pistol squats", sets: "3x8" },
          { id: 178, name: "Reverse lunges (on each leg)", sets: "3x10" },
          { id: 179, name: "Burpees", sets: "1x Max" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + biceps",
        exercises: [
          { id: 180, name: "Scapular retraction in hang", sets: "2x15" },
          { id: 181, name: "Wide grip pull-ups, alternating each", sets: "3x7" },
          { id: 182, name: "Close grip pull-ups on low bar", sets: "3x8" },
          { id: 183, name: "Bicep curls with dumbbell, weight, or water bottle with supination", sets: "4x10" },
        ],
      },
      {
        day: "Friday",
        focus: "Chest + triceps",
        exercises: [
          { id: 86, name: "Dips", sets: "4x7" },
          { id: 184, name: "Press with dumbbell, weight, or water bottle lying on the floor", sets: "4x Max" },
          { id: 185, name: "Press with dumbbell, weight, or water bottle lying on the floor with a pause at the top for 2 seconds", sets: "4x7" },
          { id: 186, name: "Triceps pushdown with extra weight", sets: "4x8" },
          { id: 187, name: "French press with weight (dumbbell, water bottle)", sets: "4x10" },
          { id: 131, name: "Push-ups", sets: "1x Max" },
        ],
      },
      {
        day: "Saturday",
        focus: "Abs + Static holds",
        exercises: [
          { id: 145, name: "Leg raises on a bar", sets: "3x8" },
          { id: 118, name: "Leg raises on parallel bars", sets: "3x8" },
          { id: 119, name: "Crunches", sets: "3x15" },
          { id: 120, name: "Plank", sets: "2x Max" },
        ],
      },
    ],
  },
  {
    week: 7,
    workouts: [
      {
        day: "Monday",
        focus: "Legs",
        exercises: [
          { id: 178, name: "Reverse lunges (on each leg)", sets: "4x12" },
          { id: 188, name: "Squat jumps with weight", sets: "3x12" },
          { id: 177, name: "Front squats with weight in front (emphasis on negative repetitions)", sets: "4x12" },
          { id: 189, name: "Lunges with weight on shoulders", sets: "3x12" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + biceps",
        exercises: [
          { id: 190, name: "Wide grip pull-ups behind the neck", sets: "3x10" },
          { id: 180, name: "Scapular retraction in hang", sets: "3x15" },
          { id: 128, name: "Pull-ups behind the neck", sets: "3x10" },
          { id: 191, name: "Close grip pull-ups on low bar with reverse grip", sets: "3x18" },
          { id: 192, name: "Bicep curls with barbell with supination", sets: "4x10" },
        ],
      },
      {
        day: "Friday",
        focus: "Chest + triceps",
        exercises: [
          { id: 86, name: "Dips", sets: "4x12" },
          { id: 193, name: "Push-ups (superset)", sets: "4x12" },
          { id: 194, name: "Shoulder push-ups (legs on elevation, pelvis bent)", sets: "4x15" },
          { id: 195, name: "Triceps push-up from a bar with extra weight", sets: "4x12" },
          { id: 196, name: "Close grip dips", sets: "4x12" },
          { id: 197, name: "French press with dumbbell (one arm at a time)", sets: "4x12" },
          { id: 198, name: "Push-ups with legs on elevation", sets: "1x Max" },
        ],
      },
      {
        day: "Saturday",
        focus: "Sprints + static holds",
        exercises: [
          { id: 199, name: "4 sprints (60 meters)", sets: "4 x Max" },
          { id: 200, name: "Plank 2 sets", sets: "2x Max" },
        ],
      },
    ],
  },
  {
    week: 8,
    workouts: [
      {
        day: "Wednesday",
        focus: "Final test of strength",
        exercises: [
          { id: 91, name: "Pull-ups", sets: "1x Max", notes: "Test your max reps!" },
          { id: 201, name: "Rest for 15 minutes", sets: "-" },
          { id: 202, name: "Dips on parallel bars", sets: "1x Max", notes: "Test your max reps!" },
          { id: 203, name: "Rest for 20 minutes", sets: "-" },
          { id: 204, name: "Push-ups from the floor", sets: "1x Max", notes: "Test your max reps!" },
        ],
      },
    ],
  },
];

export const strengthTest = {
  initial: [
    { exercise: "Pull-ups", sets: "1 set of maximum reps" },
    { exercise: "Rest for 15 minutes", sets: "-" },
    { exercise: "Parallel bar dips", sets: "1 set of maximum reps" },
    { exercise: "Rest for 20 minutes", sets: "-" },
    { exercise: "Push-ups", sets: "1 round of maximum reps" },
  ],
  note: "On the same day, or preferably the next day, start the workouts.",
};
