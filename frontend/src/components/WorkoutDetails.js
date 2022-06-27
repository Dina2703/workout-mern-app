import React from "react";
import { Link } from "react-router-dom";

function WorkoutDetails({ workout, deleteWorkout }) {
  return (
    <div className="workout-details">
      <button className="deleteIcon" onClick={() => deleteWorkout(workout._id)}>
        x
      </button>
      <Link to={`/${workout._id}`}>
        <h4>{workout.title}</h4>
        <p>
          <strong>Load ()kg: </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>{workout.createdAt}</p>
      </Link>
    </div>
  );
}

export default WorkoutDetails;
