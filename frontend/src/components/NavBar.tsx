import { A } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";

export const NavBar = () => {
  // const default_class_list = "button is-dark";
  // const enabled_class_list = "button is-dark is-active";

  const default_class_list = "navbar-menu";
  const enabled_class_list = "navbar-menu is-active";

  const [burger_is_expand, set_burger_is_expand] = createSignal(false);
  const [class_items, set_class_item] = createSignal(default_class_list);

  const on_click_burger = (_e: any) => {
    set_burger_is_expand(!burger_is_expand());
  };

  createEffect(() => {
    console.log("here");
    if (burger_is_expand()) {
      set_class_item(enabled_class_list);
    } else {
      set_class_item(default_class_list);
    }
  });

  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <A href="/" class="navbar-item">
            <strong>JK Barbell</strong>
          </A>
          <button
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarending"
            onClick={on_click_burger}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div class={class_items()}>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <A href="/wns-calculator" class="button is-dark">
                  WNS Calculator
                </A>
                <A href="/create-workout" class="button is-dark">
                  Start Workout
                </A>
                <A href="/view-workouts" class="button is-dark">
                  View All Workouts
                </A>
                <A href="/view-stats" class="button is-dark">
                  View Stats
                </A>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
