import { Tabs, TabList, Tab, TabPanels, TabPanel, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import WorkoutList from './components/WorkoutList/WorkoutList';
import SessionsHistory from './routes/SessionsHistory';

enum TabEnum {
  Workouts,
  History,
  Stats
}

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const params = useParams();
  const tab = params.tab || 'workouts';

  const updateUrl = (tab: string) => {
    window.history.pushState(null, `Workouts - ${tab}`, `/${tab}`);
  }

  useEffect(() => {
    switch(tab) {
      case 'workouts':
        setTabIndex(TabEnum.Workouts);
        break;
      case 'history':
        setTabIndex(TabEnum.History);
        break
      case 'stats':
        setTabIndex(TabEnum.Stats);
        break;
      default:
        setTabIndex(TabEnum.Workouts);
    }
  }, [tab]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    let url = "workouts";
    switch(index) {
      case TabEnum.Workouts:
        url = 'workouts';
        break;
      case TabEnum.History:
        url = 'history';
        break
      case TabEnum.Stats:
        url = 'stats';
        break;
    }
    updateUrl(url);
  }
  
  return (
    <Tabs isLazy isFitted w="full" index={tabIndex} onChange={handleTabChange}>
      <TabList>
        <Tab>Workouts</Tab>
        <Tab>History</Tab>
        <Tab>Stats</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <WorkoutList />
        </TabPanel>
        <TabPanel>
          <SessionsHistory />
        </TabPanel>
        <TabPanel>
          <Center>WORK IN PROGRESS</Center>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
