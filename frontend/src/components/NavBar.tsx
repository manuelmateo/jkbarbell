import { A } from "@solidjs/router";

export const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <A href="/" class="contrast">
              <strong>JK Barbell</strong>
            </A>
          </li>
        </ul>
        <ul>
          <li>
            <details class="dropdown">
              <summary>Start</summary>
              <ul dir="rtl">
                <li>
                  <A href="/create-workout">Start Workout</A>
                </li>
                <li>
                  <A href="/view-workouts">View All Workouts</A>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </>
  );
};
