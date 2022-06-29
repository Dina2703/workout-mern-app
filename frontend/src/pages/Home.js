import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id) => {
    console.log("deleteIcon presssed", id);
    const response = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });

    const deletedWorkout = await response.json();
    console.log(deletedWorkout);

    if (!response.ok) {
      alert(deletedWorkout.error);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              deleteWorkout={deleteWorkout}
            />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
