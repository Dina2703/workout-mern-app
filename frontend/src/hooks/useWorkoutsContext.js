import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  //context of WorkoutContext: state & dispatch.
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error("There is NO any context");
  }

  return context;
};
