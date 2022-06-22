const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

//it creates an instance of Route, then we can use it to create different routes
const routes = express.Router();

//GET all workouts
routes.get("/", getWorkouts);

//GET single workout
routes.get("/:id", getWorkout);

//POST a new workout
routes.post("/", createWorkout);

//DELETE single workout
routes.delete("/:id", deleteWorkout);

//UPDATE single workout
routes.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE single workout" });
});

module.exports = routes;
