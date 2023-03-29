import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  Spacer,
  Grid,
  GridItem,
} from '@chakra-ui/react';

function Timer({ timerData }) {
  const [timeLeft, setTimeLeft] = useState(timerData.timeSet);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          const [hours, minutes, seconds] = prevTimeLeft.split(':').map(Number);
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          if (totalSeconds === 0) {
            setIsRunning(false);
            clearInterval(timer);
            // Here you can add any code to handle the end of the timer
            return prevTimeLeft;
          } else {
            const remainingSeconds = totalSeconds - 1;
            const newHours = Math.floor(remainingSeconds / 3600);
            const newMinutes = Math.floor(
              (remainingSeconds - newHours * 3600) / 60
            );
            const newSeconds = remainingSeconds % 60;
            return `${newHours.toString().padStart(2, '0')}:${newMinutes
              .toString()
              .padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(timerData.timeSet);
  };

  return (
    <Grid
      width={'100%'}
      templateColumns="repeat(3, 1fr)"
      gap={2}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p="2"
      alignItems="center"
    >
      <GridItem colSpan={1} textAlign="left">
        <Text fontSize="sm" fontWeight="bold">
          {timerData.taskOwner}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {timerData.taskName}
        </Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Text textAlign="center" fontWeight="bold" fontSize="md" minW="48px">
          {timeLeft}
        </Text>
      </GridItem>
      <GridItem colSpan={1}>
        {!isRunning && (
          <Button size="sm" colorScheme="green" onClick={handleStart}>
            Start
          </Button>
        )}
        {isRunning && (
          <>
            <Button size="sm" colorScheme="red" onClick={handleStop} mx="1">
              Stop
            </Button>
            <Button size="sm" colorScheme="yellow" onClick={handleReset}>
              Reset
            </Button>
          </>
        )}
      </GridItem>
    </Grid>
  );
}

export default Timer;
