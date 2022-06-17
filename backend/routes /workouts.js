const express = require("express");

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
routes.post("/", (req, res) => {
  res.json({ mssg: "POST single workout" });
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
