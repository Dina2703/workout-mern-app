const express = require("express");
const Workout = require("../models/WorkoutModel");

//it creates an instance of Route, then we can use it to create different routes
const routes = express.Router();

//GET all workouts
routes.get("/", (req, res) => {
  res.json({ mssg: "Get all workouts" });
});

//GET single workout
routes.get("/:id", (req, res) => {
  res.json({ mssg: "Get single workout" });
});

//POST a new workout
routes.post("/", async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const newWorkout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//DELETE single workout
routes.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE single workout" });
});

//UPDATE single workout
routes.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE single workout" });
});

module.exports = routes;
