import useStore from '../hooks/useStore';

import { Flex } from '@chakra-ui/react';
import SessionCard from '../components/SessionCard/SessionCard';
import { useEffect, useState } from 'react';
import Session from '../models/Session';

const SessionHistory = () => {
  const store = useStore();
  const [sessions, setSessions] = useState([] as Session[]);

  useEffect(() => {
    if (store) {
      setSessions(store.sessions);
    }
  }, [store]);

  return (
    <Flex direction="column" mx="auto">
      {sessions.length > 0 
       ? sessions.map((session, index) =>
          <SessionCard key={index} session={session} />
        )
        : <p>No sessions yet</p>
      }
    </Flex>
  )
}

export default SessionHistory;