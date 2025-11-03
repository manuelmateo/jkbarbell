import { createEffect, createSignal, For, Show } from "solid-js";

const FrequencyAndSetCount = (props: any) => {
  return (
    <>
      <div class="field">
        <label class="label">Frequency</label>
        <div class="select">
          <select
            value={props.frequency()}
            onChange={(e) => {
              props.set_frequency(Number(e.target.value));
            }}
          >
            <For each={[...Array(5).keys()]}>
              {(item, _index) => <option value={item}>{item}</option>}
            </For>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label"># of Sets</label>
        <div class="select">
          <select
            value={props.set_count()}
            onChange={(e) => {
              props.set_set_count(Number(e.target.value));
            }}
          >
            <For each={[...Array(10).keys()]}>
              {(item, _index) => <option value={item}>{item}</option>}
            </For>
          </select>
        </div>
      </div>
    </>
  );
};

export const WeeklyCalculator = () => {
  let scho_set_count_to_au = new Map<number, number>([
    [1, 1],
    [2, 1.39],
    [3, 1.61],
    [4, 1.77],
    [5, 1.9],
    [6, 2],
    [7, 2.09],
    [8, 2.16],
    [9, 2.23],
  ]);

  let pell_set_count_to_au = new Map<number, number>([
    [1, 1],
    [2, 1.82],
    [3, 2.5],
    [4, 3.07],
    [5, 3.56],
    [6, 4],
    [7, 4.4],
    [8, 4.78],
    [9, 5.16],
  ]);

  const [frequency, set_frequency] = createSignal(0);
  const [set_count, set_set_count] = createSignal(0);
  const [avg_weekly_net_stim, set_avg_weekly_net_stim] = createSignal(0);
  const [scho_weekly_net_stim, set_scho_weekly_net_stim] = createSignal(0);
  const [pell_weekly_net_stim, set_pell_weekly_net_stim] = createSignal(0);

  createEffect(() => {
    let scho_workout_au = scho_set_count_to_au.get(set_count()) ?? 0;
    let pell_workout_au = pell_set_count_to_au.get(set_count()) ?? 0;
    // let avg_workout_au = avg_set_count_to_au.get(set_count()) ?? 0;

    set_scho_weekly_net_stim(scho_workout_au * frequency());
    set_pell_weekly_net_stim(pell_workout_au * frequency());
    set_avg_weekly_net_stim(
      (scho_weekly_net_stim() + pell_weekly_net_stim()) / 2,
    );
  });

  return (
    <>
      <div class="box container">
        <h1 class="title">Weekly Net Stimulus Calculator</h1>
        <Show when={avg_weekly_net_stim() > 0}>
          <table class="table">
            <thead>
              <tr>
                <th>Dataset</th>
                <th>Weekly Net Stimulus (arbitrary units (AU))</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Schoenfield</th>
                <td>{scho_weekly_net_stim()}</td>
              </tr>
              <tr>
                <th>Pelland</th>
                <td>{pell_weekly_net_stim()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Average</th>
                <td>{avg_weekly_net_stim().toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </Show>

        <div class="box container">
          <FrequencyAndSetCount
            frequency={frequency}
            set_frequency={set_frequency}
            set_count={set_count}
            set_set_count={set_set_count}
          />
        </div>
      </div>
    </>
  );
};
