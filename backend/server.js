require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes /workouts");

//express app
const app = express();

//to create a middleware in express app we need to use 'use method', and pass a function that will fire for any request that comes in. And inside the function get access to 3 things: request object, response object and function called 'next', which we have to run at the end of this middleware in order to move on to the next piece of middleware.
//app.use(express.json()); this middleware fires in each request and looks if it has some body to the request(some data that we sending to the server), and if it does then it parses it and attaches it to the request obj, so we can access it in the request handler, like  'req.body'
//middlewares

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
// app.get("/", (req, res) => {
//   res.json({ mssg: " Welcome to Workout MERN app" });
// });

app.use("/api/workouts", workoutRoutes);

//connect to db via mongoose. and it's a async process, it takes a little bit of time to do, it returns a promise
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen a specific port number  for requests
    app.listen(process.env.PORT, (req, res) => {
      console.log("Connected to db & listining on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// We could've run 'node server.js'   to run the server, but if we make a change to the file now in order for this to work we'd have to cancel out of this process and then run 'node server.js' again. Instead use 'nodemon'. To run it say 'nodemon server.js'. It re-runs the file each time, when it detected a change.
