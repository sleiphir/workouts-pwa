import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Workout } from "../../models/Workout";
import {
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td
} from "@chakra-ui/react";

interface Props {
  state: Workout
}

export function WorkoutCard({ state }: Props) {
  const { id, exercises, name } = state;
  const navigate = useNavigate();

  const pushWorkout = () => {
    navigate(`/workouts/${id}/1`);
  };

  return (
      <ButtonGroup size="lg" m="3" mx="auto" isAttached variant="outline">
        <Button onClick={pushWorkout} mr="-px" size="lg">{name}</Button>
        <Popover size="lg">
          <PopoverTrigger>
            <IconButton size="lg" aria-label="See details" icon={<ChevronDownIcon />} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign="center" as="b">Details</PopoverHeader>
            <PopoverBody>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Sets×Reps</Th>
                    <Th>Exercises</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {
                  exercises.map((exercise, i) => <Tr>
                    <Td textAlign="center">{exercise.sets.length}×{exercise.sets[0].reps}</Td>
                    <Td color="blue.400" textDecoration="underline"><a rel="noreferrer" target="_blank" href={exercise.media}>{exercise.name}</a></Td>
                  </Tr>)
                }
                </Tbody>
              </Table>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
  )
}

export default WorkoutCard;