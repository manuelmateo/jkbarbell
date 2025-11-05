export const TEST_DB = "../test_db.json";

export interface exercise {
  name: string;
}

export interface set {
  exercise: exercise;
  reps: number;
  weight_in_lbs: number;
}

export interface workout {
  id: number;
  name: string;
  date: Date;
  total_time_in_seconds: number;
  sets: set[];
}

export type new_workout = Omit<workout, "id">;

export type new_exercise = Omit<exercise, "name">;