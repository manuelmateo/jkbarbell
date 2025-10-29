import express from "express";
import { new_workout } from "../types";
import {
  get_all_workouts,
  get_workout_by_id,
  save_workout,
} from "../controllers/workout_service";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.send("getting workouts");
  get_all_workouts()
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((_err) => {
      res.sendStatus(400).send({ error: "couldn't get workouts" });
    });
});

router.get("/:id", (req, res) => {
  const workout_id = Number(req.params.id);

  get_workout_by_id(workout_id)
    .then((workout) => {
      res.json(workout);
    })
    .catch((_err) => {
      res.status(400).send({ error: "couldn't find workout" });
    });
});

router.post("/", (req, res) => {
  const workout = req.body as new_workout;

  save_workout(workout)
    .then((saved_item) => {
      res.json(saved_item);
    })
    .catch((_err) => {
      res.status(400).json("couldn't save workout");
    });
});

export default router;
