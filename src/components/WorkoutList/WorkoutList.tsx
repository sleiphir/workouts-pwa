import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from 'react-router'
import useStore from "../../hooks/useStore";
import Workout from "../../models/Workout";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import workouts from '../../workouts/workout.json'

export function WorkoutList() {
  const store = useStore();
  const navigate = useNavigate()

  // Load default workouts if they don't exist
  useEffect((): void => {
    if (store) {
      if (store.workouts.length === 0) {
        workouts.forEach((workout: Workout) => store.insertWorkout(workout));
        store.save();
        navigate("/");
      }
    }
  }, [store, navigate]);
  
  return (
    <Flex direction="column">
      { store?.workouts 
        ? store.workouts.map((workout: Workout) => (<WorkoutCard key={workout.id} {...workout} />))
        : <Spinner mx="auto" size="xl" />
      }
    </Flex>
  );
}

export default WorkoutList;