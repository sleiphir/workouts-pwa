import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Exercise } from "../../models/Workout";

interface Props {
  id: string;
  name: string;
  exercises: Exercise[];
}

export function WorkoutCard({ id, name, exercises }: Props) {
  const navigate = useNavigate();

  const detailedExercises = exercises.map((exercise) => {
    return `${exercise.sets.length} × ${exercise.sets[0].reps} ${exercise.name}`;
  });

  const pushWorkout = () => {
    navigate(`/workouts/${id}/1`);
  };

  return (
      <ButtonGroup size="lg" m="3" mx="auto" isAttached variant="outline">
        <Button onClick={pushWorkout} mr="-px" size="lg">{name}</Button>
        <Popover>
          <PopoverTrigger>
            <IconButton size="lg" aria-label="See details" icon={<ChevronDownIcon />} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Exercises</PopoverHeader>
            <PopoverBody>
              {detailedExercises.map((exercise, index) => <div key={index}>{exercise}</div>)}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
  )
}

export default WorkoutCard;