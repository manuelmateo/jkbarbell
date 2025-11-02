import { A } from "@solidjs/router";

export const NavBar = () => {
  return (
    <>
      <nav class="navbar">
        <div class="container">
          <div id="navMenu" class="navbar-menu">
            <div class="navbar-start">
              <div class="navbar-brand">
                <A href="/" class="navbar-item">
                  <strong>JK Barbell</strong>
                </A>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <A href="/create-workout" class="button is-dark">
                    Start Workout
                  </A>
                  <A href="/view-workouts" class="button is-dark">
                    View All Workouts
                  </A>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
