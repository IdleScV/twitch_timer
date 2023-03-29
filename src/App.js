import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';

import TimerList from './components/TimerList';
import AddTimer from './components/AddTimer';

function App() {
  const [timerData, setTimerData] = React.useState([]);

  const handleAddTimer = newTimer => {
    const id = Date.now().toString();
    setTimerData([...timerData, { ...newTimer, id }]);
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
