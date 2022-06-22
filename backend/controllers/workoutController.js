const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

//GET all workouts
const getWorkouts = async (req, res) => {
  //.sort({ createdAt: -1 }) to get newest at the top
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // if the id is NOT valid, show error message, instead of throwing internal error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `Workout  with id ${id} not found` });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//POST/CREATE a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  //add cod to db
  try {
    const newWorkout = await Workout.create({ title, reps, load });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a  workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workoutToDelete = await Workout.findById(id);
  await workoutToDelete.remove();
  if (!workoutToDelete) {
    return res.status(404).json({ error: "No such workout" });
  }
  res
    .status(200)
    .json({ message: `Workout  with id ${id} successfully deleted` });
};

//UPDATE a  workout

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
};
