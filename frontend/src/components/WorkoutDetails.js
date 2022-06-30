import React from "react";
import { Link } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();

  const deleteWorkout = async () => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: "DELETE",
      });

      const deleteWorkout = await response.json();
      console.log(deleteWorkout);

      if (!response.ok) {
        return console.log(deleteWorkout.error);
      }

      dispatch({ type: "DELETE_WORKOUT", payload: deleteWorkout._id });
    }
  };

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
