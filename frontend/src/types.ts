export interface exercise {
  name: string;
}

export const default_exercises = [
  {
    name: "Dumbell Lat Pulldown",
  },
  {
    name: "Dumbell Tricep Kickbacks",
  },
  {
    name: "5-Minute Ab Circuit",
  },
  {
    name: "Hex Press",
  },
  {
    name: "Standing Chest Press",
  },
];

export interface single_set {
  exercise: exercise;
  reps: number;
  weight_in_lbs: number;
}

export interface workout {
  id: number;
  name: string;
  date: Date;
  total_time_in_seconds: number;
  sets: single_set[];
}

export type new_workout = Omit<workout, "id">;

export type new_exercise = Omit<exercise, "name">;