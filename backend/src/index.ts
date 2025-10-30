import express from "express";
import cors from "cors";

import workout_router from "./routes/workout";

const app = express();

app.use(express.json());
app.use(cors<express.Request>());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/workouts", workout_router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
