import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WorkoutPage() {
  const [workout, setWorkout] = useState(null);
  const [load, setLoad] = useState(true);

  const params = useParams();
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`/api/workouts/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setWorkout(data);
        setLoad(false);
        console.log(data);
      }
    };

    fetchWorkout();
  }, [params]);

  if (load) {
    return <p>Loading</p>;
  }
  return (
    <div className="workout-details">
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
    </div>
  );
}

export default WorkoutPage;
