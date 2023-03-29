import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  theme,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';

import TimerList from './components/TimerList';
import AddTimer from './components/AddTimer';

function App() {
  const [timerData, setTimerData] = React.useState([]);

  const handleAddTimer = newTimer => {
    setTimerData([...timerData, newTimer]);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" p="2">
        <AddTimer onAddTimer={handleAddTimer} />
        <TimerList data={timerData} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
