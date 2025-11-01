import { createSignal, For } from "solid-js";
import { type workout } from "../types";
import axios from "axios";

const get_date_as_mm_dd_yy_format = (date: Date) => {
  const today = new Date(date);

  const date_component = today.getDate();
  const month_component = today.getMonth() + 1;
  const year_component = today.getFullYear();

  let dd = date_component.toString();
  let mm = month_component.toString();

  if (date_component < 10) {
    dd = "0" + dd;
  }

  if (month_component < 10) {
    mm = "0" + mm;
  }

  return mm + "/" + dd + "/" + year_component;
};

export const SingleWorkout = (props: any) => {
  const workout = props.workout as workout;
  const date_text = get_date_as_mm_dd_yy_format(workout.date);
  const time_text =
    workout.total_time_in_seconds < 60
      ? `${workout.total_time_in_seconds}s`
      : `${workout.total_time_in_seconds / 60} min`;

  return (
    <>
      <details name="workout">
        <summary>
          "<mark>{workout.name}</mark>" on <i>{date_text}</i> took{" "}
          <i>{time_text}</i>
        </summary>
        <div class="overflow-auto">
          <ul>
            <For each={workout.sets}>
              {(item, _index) => (
                <li>
                  {item.exercise.name}: {item.reps}x{item.weight_in_lbs}lbs
                </li>
              )}
            </For>
          </ul>
        </div>
      </details>
    </>
  );
};

export const ViewWorkout = () => {
  const [workout_list, set_workouts] = createSignal([] as workout[]);

  axios
    .get("http://localhost:3000/api/workouts")
    .then((workouts) => {
      set_workouts(workouts.data);
    })
    .catch((e) => {
      console.log("error getting past workouts", e);
    });

  return (
    <div class="container-fluid">
      <article class="container-fluid">
        <h1>Past Workouts</h1>
        <hr />
        <For each={workout_list()}>
          {(item, _index) => (
            <>
              <div class="overflow-auto" style="max-height: 250px">
                <SingleWorkout workout={item} />
              </div>
              <hr />
            </>
          )}
        </For>
      </article>
    </div>
  );
};
