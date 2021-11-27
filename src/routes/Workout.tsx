import { useEffect, useState } from 'react';
import useStore from '../hooks/useStore';
import InputSet from '../components/InputSet/InputSet';
import { Set } from '../models/Workout';
import { Session } from '../models/Session';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@chakra-ui/icons';
import { AspectRatio, Flex, Spinner, Heading, Grid, Button, Spacer } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const Workout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const [baseWorkout, setBaseWorkout]: any = useState(null);
  const [session, setSession]: any = useState(null);
  const { id, pageId } = params;
  const page = parseInt(pageId ?? "1", 10) || 1;
  
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
        setSession(session);
      }
    }
  }, [store, id, baseWorkout]);

  if (page && isNaN(Number(page))) {
    return <div>Wrong page number</div>
  }

  if (!id) {
    return <div>No workout id provided</div>;
  }

  // const saveSession = (): void => {
  //   store.insertSession(session);
  //   store.save();
  // }

  const nextPage = () => {
    if (page < session.workout?.exercises.length - 1) {
      console.log(`/workouts/${id}/${page + 1}`);
      navigate(`/workouts/${id}/${page + 1}`);
    }
  }

  const prevPage = () => {
    if (page > 0) {
      navigate(`/workouts/${id}/${page - 1}`);
    }
  }

  return (
    <>
    {session?.workout 
    ? <Flex direction="column" w="full" minH="100vh">
        <Flex direction="column" grow="1" shrink="1">
          <AspectRatio ratio={16 / 9}>
            <iframe title={session.workout.exercises[page].name} src={session.workout.exercises[page].media}
              frameBorder="0" allowFullScreen />
          </AspectRatio>
          <Heading m={4} size="md" mx="auto">{session.workout.exercises[page].name}</Heading>
          <Grid column="1" gap={4} mx="auto">
            {session.workout?.exercises[page].sets.map((set: Set, i: number) =>
              <InputSet
                key={`${page}-${i}`} 
                default={baseWorkout.exercises[page].sets[i]} 
                state={set} />
            )}
          </Grid>
        </Flex>
        <Flex direction="row" flex="1">
          { page > 0 && <Button onClick={prevPage} m={6}><ChevronLeftIcon /></Button>}
          <Spacer />
          { page < session.workout.exercises.length - 1
            ? <Button onClick={nextPage} m={6}><ChevronRightIcon /></Button>
            : <Button m={6}><CheckIcon /></Button>
            }
        </Flex>
      </Flex>
      : <Spinner />}
    </>
  )
}

export default Workout;