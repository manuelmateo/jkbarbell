import { new_workout } from "../types";
import { get_db_connection } from "./database";

export const get_all_workouts = async () => {
  return get_db_connection().then((db) => {
    return db.data.workouts;
  });
};

export const get_workout_by_id = async (id: number) => {
  return get_db_connection().then((db) => {
    return db.data.workouts.filter((item) => item.id === id);
  });
};

export const _get_new_workout_id = async () => {
  return get_db_connection().then((db) => {
    return (Math.max(...db.data.workouts.map((d) => d.id)) ?? 0) + 1;
  });
};

export const save_workout = async (new_workout: new_workout) => {
  try {
    let id = await _get_new_workout_id();

    id = isFinite(id) ? id : 1;

    const new_item = { id: id, ...new_workout };
    const db_conn = await get_db_connection();

    db_conn.data.workouts.push(new_item);
    return new_item;
  } catch {
    throw Error("couldn't save workout");
  }
};
