import { JSONFilePreset } from "lowdb/node";
import { exercise, workout } from "../types";

type Data = {
  exercises: exercise[];
  workouts: workout[];
};

const defaultData: Data = { exercises: [], workouts: [] };

export const get_db_connection = async (db = "../exercises.json") => {
  return JSONFilePreset<Data>(db, defaultData);
};
