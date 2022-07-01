const mongoose = require("mongoose");
const Workout = require("../models/WorkoutModel");

//GET all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//GET a SINGLE  workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  //if the ID is not valid, show error message, instead of internal error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `Workout with id ${id} not found` });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout " });
  }

  res.status(200).json(workout);
};

//POST a NEW workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //to handle an error, check all fields
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  //add doc to db
  try {
    const newWorkout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(newWorkout);
  } catch (error) {
    //the error below created by mongoose, based on Schema, that we created. If we try to save a document that is not correspond out Schema(workoutSchema), it's going to throw that error.
    res.status(400).json({ error: error.message });
  }
};

//DELETE workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  //if the ID is not valid, show error message, instead of internal error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `Workout with id ${id} not found` });
  }
  //Version#1, delete item by its ID using remove() method
  // const workoutToDelete = await Workout.findById(id);

  // if (!workoutToDelete) {
  //   return res.status(404).json({ error: "No such workout" });
  // }
  // await workoutToDelete.remove();

  //Version#2 delete item by its ID using findOneAndDelete() method
  const workoutToDelete = await Workout.findOneAndDelete({ _id: id });
  if (!workoutToDelete) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workoutToDelete);
};

//UPDATE - a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  //if the ID is not valid, show error message, instead of internal error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `Workout with id ${id} not found` });
  }

  const updatedWorkout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updatedWorkout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(updatedWorkout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
