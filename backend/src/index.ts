import express from "express";

import workout_router from "./routes/workout";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/workouts", workout_router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
