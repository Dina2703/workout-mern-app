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
  const [emptyFields, setEmptyFields] = useState([]);

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

    //response might be an error object or, actial valid data
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      //data.emptyFields is obj came from backend, we're setting into 'emptyFields' brontend state.
      setEmptyFields(data.emptyFields);
    }

    if (response.ok) {
      setForm({
        title: "",
        load: "",
        reps: "",
      });
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", data);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label htmlFor="title">Exersize Title: </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={onChange}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="load">Load (in kg): </label>
      <input
        type="number"
        id="load"
        value={load}
        onChange={onChange}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label htmlFor="reps">Reps: </label>
      <input
        type="number"
        id="reps"
        value={reps}
        onChange={onChange}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
