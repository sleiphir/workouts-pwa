import { CheckIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Heading, Grid, Box, Textarea, Spacer, Button, Text, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Session from "../../models/Session";
import { Exercise } from "../../models/Workout";
import { Set } from "../../models/Workout";

interface Props {
  session: Session;
  onBack: () => void;
  onSave: () => void;
}

const ratingTexts = [
  "Very Bad",
  "Bad",
  "OK",
  "Good",
  "Very Good",
]

const ratingColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue"
]

export function SessionRecap(props: Props) {
  const { session, onSave, onBack } = props;
  const [comment, setComment] = useState(session.comment);
  const [rating, setRating] = useState(3);

  useEffect(() => {
    session.comment = comment;
  }, [comment, session]);

  useEffect(() => {
    session.rating = rating;
  }, [rating, session]);

  return (
    <Flex h="100vh" w="100vw" direction="column" textAlign="center">
    <Heading my={5} mx="auto" size="lg">{session.workout.name} - Recap</Heading>
    <Text as="i" mb={5}>reps × weight</Text>
    <Grid shrink="1" grow="1" gap={5} m="auto">
      {session.workout.exercises.map((exercise: Exercise, i: number) => (
        <Box key={i}>
          <Heading size="sm">{exercise.name}</Heading>
          <Flex direction="column">
            {exercise.sets.map((set: Set, j: number) => (
              <Text key={j}>{set.reps}×{set.weight}</Text>
            ))}
          </Flex>
        </Box>
      ))}
    </Grid>
    <Text fontSize="xl" mt={5}>Comment</Text>
    <Textarea
      value={comment}
      w="90vw" mt={2} mx="auto"
      placeholder="Feedback"
      onChange={(e) => setComment(e.target.value)}>
    </Textarea>
    <Text fontSize="xl" mt={2}>Rating</Text>
    <Slider
      colorScheme={ratingColors[rating - 1]}
      defaultValue={3} min={1} max={5}
      w="50vw" mt={5} mx="auto"
      aria-label='Session Rating'
      value={rating}
      onChange={(value) => setRating(value)}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6} borderWidth={1} borderColor="gray.200">
        <Box color="tomato" />
      </SliderThumb>
    </Slider>
    <Text mt={2} as="b">{ratingTexts[rating - 1]}</Text>
    <Spacer />
    <Flex direction="column" mt="2rem">
      <Button
        w="min-content" m="auto" size="lg"
        onClick={onSave}
        colorScheme="green"
        variant="outline"
        leftIcon={<CheckIcon />}>
          Complete
      </Button>
      <Button mt="2rem" onClick={onBack} size="lg" leftIcon={<ChevronLeftIcon />}>
        Back to session
      </Button>
      <Spacer />
    </Flex>
  </Flex>
  );
}

export default SessionRecap;