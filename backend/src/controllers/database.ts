import { JSONFilePreset } from "lowdb/node";
import { exercise } from "../types";

type Data = {
  exercises: exercise[];
};

const defaultData: Data = { exercises: [] };

export const get_db_connection = async (db = "../exercises.json") => {
  return JSONFilePreset<Data>(db, defaultData);
};
