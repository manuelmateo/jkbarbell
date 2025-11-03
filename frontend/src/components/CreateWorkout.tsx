import { createSignal, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
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
      <div class="box" style="height: 350px">
        <form onSubmit={form_submit}>
          <h3 class="title is-2">Add set</h3>
          <div class="field">
            <label class="label">Exercise:</label>

            <div class="control">
              <div class="select">
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
                    {(item, _index) => (
                      <option value={item.name}>{item.name}</option>
                    )}
                  </For>
                </select>
              </div>
            </div>
          </div>

          <div class="field"></div>

          <div class="field is-grouped">
            <div class="control">
              <label class="label">Reps</label>
              <input
                class="input"
                placeholder="reps"
                required
                value={rep_count()}
                onInput={(e) => set_rep_count(Number(e.currentTarget.value))}
              />
            </div>

            <div class="control">
              <label class="label">Weight</label>
              <input
                class="input"
                placeholder={"lbs"}
                required
                value={weight_in_lbs()}
                onInput={(e) => set_weight(Number(e.currentTarget.value))}
              />
            </div>
          </div>

          <footer>
            <button type="submit" class="button is-link">
              Add Set
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};

export const CreateWorkout = () => {
  const navigate = useNavigate();

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
    navigate("/view-workouts", { replace: true });
  };

  return (
    <>
      <div class="box container">
        <section class="hero">
          <div class="hero-body">
            <div class="container has-text-centered">
              <p class="title">Workout</p>
              <p class="subtitle">Create a workout</p>
            </div>
          </div>
        </section>

        <div class="fixed-grid">
          <div class="grid">
            <div class="box">
              <div
                class="table-container"
                style="height: 310px; overflow-y: scroll"
              >
                <table class="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Reps</th>
                      <th>Weights</th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={sets()}>
                      {(item, _index) => (
                        <tr>
                          <th scope="row">{item.exercise.name}</th>
                          <td>{item.reps}</td>
                          <td>{item.weight_in_lbs}</td>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            </div>

            <AddSet set_sets={set_sets} />
          </div>
          <hr />

          <form onSubmit={form_submit}>
            <button
              class="button is-warning is-dark is-large is-fullwidth"
              type="submit"
            >
              Submit Workout
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
