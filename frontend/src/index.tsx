/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./styles/index.css";
import App from "./App.tsx";
import { Workout } from "./components/Workout.tsx";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root div not found");
}

render(
  () => (
    <Router>
      <Route path="/" component={App} />
      <Route path="/workout" component={Workout} />
    </Router>
  ),
  root!,
);
