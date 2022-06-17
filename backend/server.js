require("dotenv").config();

const express = require("express");

//express app
const app = express();

//to create a middleware in express app we need to use 'use method', and pass a function that will fire for any request that comes in. And inside the function get access to 3 things: request object, response object and function called 'next', which we have to run at the end of this middleware in order to move on to the next piece of middleware.
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.get("/", (req, res) => {
  res.json({ mssg: " Welcome to Workout MERN app" });
});

//listen a specific port number  for requests
app.listen(process.env.PORT, (req, res) => {
  console.log("Listining on port", process.env.PORT);
});
// We could've run 'node server.js'   to run the server, but if we make a change to the file now in order for this to work we'd have to cancel out of this process and then run 'node server.js' again. Instead use 'nodemon'. To run it say 'nodemon server.js'. It re-runs the file each time, when it detected a change.