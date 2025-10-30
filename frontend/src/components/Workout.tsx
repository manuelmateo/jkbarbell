import { createSignal, For } from "solid-js";
import {
  default_exercises,
  type exercise,
  type single_set,
  type new_workout,
} from "../types";
import axios from "axios";

export const AddSet = (props: any) => {
  const [exercise_list, set_exercise_list] = createSignal([] as exercise[]);

  // form related stuff
  const [current_exercise_name, set_current_exercise] = createSignal("");
  const [rep_count, set_rep_count] = createSignal(0);
  const [weight_in_lbs, set_weight] = createSignal(0);

  axios
    .get("http://localhost:3000/api/exercises")
    .then((res) => {
      set_exercise_list(res.data);
    })
    .catch(() => {
      set_exercise_list(default_exercises);
    });

  const form_submit = (e: SubmitEvent) => {
    e.preventDefault();
    const current_exercise = exercise_list().find(
      (exercise) => exercise.name === current_exercise_name(),
    );

    if (!current_exercise) {
      return;
    }
    const current_set: single_set = {
      exercise: current_exercise,
      reps: rep_count(),
      weight_in_lbs: weight_in_lbs(),
    };

    console.log(current_set);
    props.set_sets((set_list: single_set[]) => set_list.concat(current_set));
  };

  return (
    <>
      <form onSubmit={form_submit}>
        <h3>Add set</h3>
        <label>
          Exercise:
          <select
            value={current_exercise_name()}
            onChange={(e) => {
              const exercise = exercise_list().find(
                (exercise) => exercise.name === e.target.value,
              );
              set_current_exercise(exercise ? exercise.name : "");
            }}
          >
            <option value="">Pick an exercise:</option>
            <For each={exercise_list()}>
              {(item, _index) => <option value={item.name}>{item.name}</option>}
            </For>
          </select>
          <input
            placeholder="0"
            required
            value={rep_count()}
            onInput={(e) => set_rep_count(Number(e.currentTarget.value))}
          />
          reps x
          <input
            placeholder="0"
            required
            value={weight_in_lbs()}
            onInput={(e) => set_weight(Number(e.currentTarget.value))}
          />
          lbs
        </label>
        <button type="submit">Add Set</button>
      </form>
    </>
  );
};

export const Workout = () => {
  const [sets, set_sets] = createSignal([] as single_set[]);
  const workout_start = new Date();

  const form_submit = (_e: SubmitEvent) => {
    const current_time = new Date();
    console.log(sets());
    const new_workout: new_workout = {
      sets: sets(),
      name: "Workout",
      date: current_time,
      total_time_in_seconds:
        (current_time.valueOf() - workout_start.valueOf()) / 1000,
    };
    axios
      .post("http://localhost:3000/api/workouts", new_workout)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <form onSubmit={form_submit}>
        <h1>Workout</h1>
        <ul>
          <For each={sets()}>
            {(item, _index) => (
              <li>
                {item.exercise.name}: {item.reps}x{item.weight_in_lbs}lbs
              </li>
            )}
          </For>
        </ul>
        <AddSet set_sets={set_sets} />
        <button type="submit">Submit Workout</button>
      </form>
    </>
  );
};
