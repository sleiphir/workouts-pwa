import { useEffect, useReducer, useState } from 'react';
import useStore from '../hooks/useStore';
import InputSet from '../components/InputSet/InputSet';
import { Set } from '../models/Workout';
import { Session } from '../models/Session';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, DeleteIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AspectRatio,
  Flex,
  Spinner,
  Heading,
  Grid,
  Button,
  Spacer,
  useBoolean,
  Box, 
  useToast,
} from '@chakra-ui/react';
import ButtonWithAlert from '../components/ButtonWithAlert/ButtonWithAlert';
import SessionRecap from '../components/SessionRecap/SessionRecap';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'init':
      return action.session;
    case 'addSet':
      state.workout.exercises[action.page].sets.push(action.set);
      return { ...state };
    case 'deleteSet':
      state.workout.exercises[action.page].sets.splice(action.index, 1);
      return { ...state };
    case 'deleteExercise':
      state.workout.exercises.splice(action.index, 1);
      return { ...state };
  }
  return state;
}

const Workout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const toast = useToast();
  const [editMode, setEditMode] = useBoolean(false);
  const [baseWorkout, setBaseWorkout]: any = useState(null);
  const [session, dispatch]: any = useReducer(reducer, null);
  const { id, pageId } = params;
  const page = parseInt(pageId ?? "1", 10) - 1 || 0;
  
  useEffect(() => {
    if (store && id) {
      const workout = store.getWorkout(id);
      if (workout) {
        setBaseWorkout(workout);
        const date = new Date();
        const session: Session = {
          id: `${date}_${workout.id}`,
          workout: JSON.parse(JSON.stringify(workout)),
          date: date,
          rating: 0,
          comment: ''
        }
        dispatch({type: 'init', session});
      }
    }
  }, [id, store]);

  if (!session?.workout) {
    return <Spinner />;
  }

  if (page && isNaN(Number(page))) {
    return <div>Wrong page number</div>
  }

  if (!id) {
    return <div>No workout id provided</div>;
  }

  const saveSession = (): void => {
    if (store) {
      store.insertSession(session);
      store.save();
      toast({
        title: 'Session saved',
        description: "This workout sessions was saved successfuly.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      navigate(`/workouts`);
    }
  }

  const nextPage = () => {
    if (page < session.workout?.exercises.length) {
      // page is pageId - 1, so +1 for pageId +1 for next page
      navigate(`/workouts/${id}/${page + 2}`);
    }
  }

  const prevPage = () => {
    if (page > 0) {
      // page is pageId - 1, no need to -1 once more
      navigate(`/workouts/${id}/${page}`);
    }
  }

  const addSet = () => {
    if (!session.workout?.exercises[page]) {
      return;
    }
    const baseSet: Set = baseWorkout.exercises[page].sets[0];
    dispatch({type: 'addSet', page: page, set: { reps: baseSet.reps, weight: baseSet.weight}});
  }

  const deleteSet = (index: number) => {
    if (!session.workout?.exercises[page]) {
      return;
    }
    dispatch({type: 'deleteSet', page: page, index: index});
  }

  const deleteExercise = (index: number) => {
    if (!session.workout?.exercises[page]) {
      return;
    }
    dispatch({type: 'deleteExercise', index: index});
  }

  // Last page: Session's recap
  if (session?.workout && page === session.workout.exercises.length) {
    return <SessionRecap session={session} onSave={saveSession} onBack={prevPage} />;
  }

  return (
    <Flex direction="column" w="full" minH="100vh">
      <Flex direction="column" grow="1" shrink="1">
        <AspectRatio ratio={16 / 9}>
          <iframe title={session.workout.exercises[page].name} src={session.workout.exercises[page].media}
            frameBorder="0" allowFullScreen />
        </AspectRatio>
        <Heading m={4} size="md" mx="auto">{session.workout.exercises[page].name}</Heading>
        <Grid column="1" mx="auto">
          { session.workout?.exercises[page].sets.map((set: Set, i: number) =>
            <InputSet
              key={`${page}-${i}-${set.reps}-${set.weight}`}
              editMode={editMode}
              deleteFunc={() => deleteSet(i)}
              default={baseWorkout.exercises[page].sets[0]}
              state={set} />
          )}
          { editMode &&
            <Button
              onClick={addSet}
              size="md" m={4}
              colorScheme="green"
              variant="outline"
              leftIcon={<AddIcon />}>Add set</Button>
          }
        </Grid>
      </Flex>
      <Flex direction="row">
        { !editMode && <>
          { page > 0
            ? <Button size="md" m={2} onClick={prevPage} ><ChevronLeftIcon /></Button>
            : <Box w="48px" m={2}></Box>
          }
        </>}
        <Spacer />
        <ButtonWithAlert
          onConfirm={() => deleteExercise(page)}
          dialogHeader="Delete Exercise"
          dialogBody={`Are you sure you want to delete ${session.workout.exercises[page].name} for this session?`}
          colorScheme="red"
          variant="outline"
          size="md" m={2}
          leftIcon={<DeleteIcon />}>
          Remove
        </ButtonWithAlert>
        { !editMode
          ? <Button
              onClick={setEditMode.on}
              colorScheme="gray"
              variant="outline"
              size="md"
              m={2}
              w={28}
              leftIcon={<SettingsIcon />}>Edit</Button>
          : <Button
              onClick={setEditMode.off}
              colorScheme="green"
              variant="outline"
              size="md"
              m={2}
              w={28}
              leftIcon={<CheckIcon />}>Done</Button>
        }
        <Spacer />
        { !editMode && <>
          { page < session.workout.exercises.length - 1
            ? <Button onClick={nextPage} size="md" m={2}><ChevronRightIcon /></Button>
            : <Button onClick={nextPage} colorScheme="green" m={2}><CheckIcon /></Button>
          }
        </>}
      </Flex>
    </Flex>
  );
}

export default Workout;