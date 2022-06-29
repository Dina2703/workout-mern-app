import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();

  const [form, setForm] = useState({
    title: "",
    load: "",
    reps: "",
  });
  const [error, setError] = useState(null);

  const { title, load, reps } = form;

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWorkout = { title, load, reps };

    //POST request to the server
    const response = await fetch(`/api/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setError(null);
      setForm({
        title: "",
        load: "",
        reps: "",
      });
      console.log("new workout added", data);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label htmlFor="title">Exersize Title: </label>
      <input type="text" id="title" value={title} onChange={onChange} />
      <label htmlFor="load">Load (in kg): </label>
      <input type="number" id="load" value={load} onChange={onChange} />
      <label htmlFor="reps">Reps: </label>
      <input type="number" id="reps" value={reps} onChange={onChange} />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
