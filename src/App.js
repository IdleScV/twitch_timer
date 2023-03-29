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

  const handleRemove = id => {
    setTimerData(timerData.filter(timer => timer.id !== id));
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        p="2"
        bg="lightgreen"
        height="100vh"
      >
        <AddTimer onAddTimer={handleAddTimer} />
        <TimerList data={timerData} handleRemove={handleRemove} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
