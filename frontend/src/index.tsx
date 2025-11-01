import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import App from "./App.tsx";
import { CreateWorkoutPage } from "./pages/CreateWorkout.tsx";
import { ViewWorkoutsPage } from "./pages/ViewWorkouts.tsx";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root div not found");
}

render(
  () => (
    <Router>
      <Route path="/" component={App} />
      <Route path="/create-workout" component={CreateWorkoutPage} />
      <Route path="/view-workouts" component={ViewWorkoutsPage} />
    </Router>
  ),
  root!,
);
