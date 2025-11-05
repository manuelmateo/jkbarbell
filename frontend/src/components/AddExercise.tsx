import axios from "axios";
import { createEffect, createSignal, For, Show} from "solid-js";
import { default_exercises, type exercise,type new_exercise} from "../types";
export const AddExercise = () => {
    const[exercise_list, set_exercise_list] = createSignal([] as exercise[])
    const form_submit = (e : SubmitEvent) => {
        e.preventDefault();
        const new_exercise: new_exercise = {

        }

    }
    axios
        .get("http://localhost:3000/api/exercises")
        .then((res) => {
            set_exercise_list(res.data);
        })
        .catch(() => {
            set_exercise_list(default_exercises);
        });
    return(
        <>
            <div class="container has-text-centered">
                <section class="hero">
                    <article class="panel is-info is-fullwidth">
                        <p class="title">Exercise</p>
                    </article>
                </section>
            </div>
            <div class="box">
                <h1 class="title has-text-centered">
                <select>
                <option value="">Current Exercises:</option>
                <For each={exercise_list()}>
                    {(item, _index) => (
                        <option value={item.name}>{item.name}</option>
                    )}
                </For>
                </select>
                </h1>
            </div>
            <div class="box">
                <h1 class="title has-text-centered">
                    <article class="panel is-info is-fullwideth">
                        <p class="title">Add Exercise:</p>
                    </article>
                    <input type="text" id="inputtedExercise">
                    </input>
                </h1>
            </div>
            <div>
            <form onSubmit={form_submit}>
                <footer>
                    <button class="button is-warning is-dark is-large is-fullwidth"
                        type="submit">
                        Submit Exercise    
                    </button>
                </footer>
            </form>
            </div>
        </>
    );
}