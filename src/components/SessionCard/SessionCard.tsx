import { Flex, Text, Box } from "@chakra-ui/react";
import Session from "../../models/Session";

interface Props {
  session: Session;
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'} as any;

export function SessionCard(props: Props) {
  const { session } = props;
  console.log('language ', navigator?.languages[0])

  return (
    <Flex direction="column">
      <Box m={3} mx="auto" p={5} borderRadius="lg" boxShadow="sm">
        <Text>{new Date(session.date).toLocaleDateString(navigator?.languages[0] ?? 'en-US', options)}</Text>
        <Text as="b">{session.workout.name}</Text>
        <Text>{session.rating}/5</Text>
      </Box>
    </Flex>
  );
}

export default SessionCard;