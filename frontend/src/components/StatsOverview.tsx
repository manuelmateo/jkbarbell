import axios from "axios";
import { createEffect, createSignal, type Accessor } from "solid-js";
import type { workout } from "../types";

const AvgWorkoutLength = (props: any) => {
  const workouts = props.workouts as Accessor<workout[]>;
  const [avg_length, set_avg_length] = createSignal("");

  createEffect(() => {
    let total = 0;
    workouts().forEach((workout) => {
      total += workout.total_time_in_seconds;
    });

    const avg_time_in_s = total / workouts().length;

    const display_time =
      avg_time_in_s > 60
        ? (avg_time_in_s / 60).toFixed(0) + " minutes"
        : avg_time_in_s.toFixed(0) + "s";

    set_avg_length(display_time);
  });

  return (
    <>
      <div class="cell">
        <article class="panel is-info">
          <p class="panel-heading">Average Workout Length</p>
          <p class="panel-block">{avg_length()}</p>
        </article>
      </div>
    </>
  );
};

const AvgWorkoutSetCount = (props: any) => {
  const workouts = props.workouts as Accessor<workout[]>;
  const [avg_set_count, set_avg_set_count] = createSignal("");

  createEffect(() => {
    let total = 0;
    workouts().forEach((workout) => {
      total += workout.sets.length;
    });

    const avg = (total / workouts().length).toFixed(1);

    set_avg_set_count(avg + " sets");
  });

  return (
    <>
      <div class="cell">
        <article class="panel is-info">
          <p class="panel-heading">Average Set Count</p>
          <p class="panel-block">{avg_set_count()}</p>
        </article>
      </div>
    </>
  );
};

const TotalWorkouts = (props: any) => {
  const workouts = props.workouts as Accessor<workout[]>;

  createEffect(() => {
    console.log(workouts());
  });

  return (
    <>
      <div class="cell">
        <article class="panel is-info">
          <p class="panel-heading">Total Workouts</p>
          <p class="panel-block">{workouts().length} workouts</p>
        </article>
      </div>
    </>
  );
};

export const StatsOverview = () => {
  const [past_workout_list, set_workout_list] = createSignal([] as workout[]);
  const [_is_error, set_is_error] = createSignal(false);

  axios
    .get("http://localhost:3000/api/workouts")
    .then((workouts) => {
      set_workout_list(workouts.data);
    })
    .catch((err) => {
      console.log(err);
      set_is_error(true);
    });

  return (
    <>
      <div class="box container">
        <h1 class="title">Stats</h1>
        <div class="grid">
          <TotalWorkouts workouts={past_workout_list} />

          <AvgWorkoutSetCount workouts={past_workout_list} />

          <AvgWorkoutLength workouts={past_workout_list} />
        </div>
      </div>
    </>
  );
};
