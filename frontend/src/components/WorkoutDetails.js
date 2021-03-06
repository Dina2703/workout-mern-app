import React from "react";
import { Link } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
//date fns package Modern JavaScript date utility library
import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
      <span
        className="material-symbols-outlined"
        onClick={() => deleteWorkout(workout._id)}
      >
        delete
      </span>
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
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </Link>
    </div>
  );
}

export default WorkoutDetails;
