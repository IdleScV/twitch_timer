import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Menu,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

function Timer({ timerData, handleRemove }) {
  const [timeLeft, setTimeLeft] = useState(timerData.timeSet);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          const [hours, minutes, seconds] = prevTimeLeft.split(':').map(Number);
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          if (totalSeconds === 0) {
            setIsRunning(false);
            setIsComplete(true);
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

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(timerData.timeSet);
  };

  const handleAddMinutes = minutes => {
    setTimeLeft(prevTimeLeft => {
      const [hours, currentMinutes] = prevTimeLeft.split(':').map(Number);
      const totalMinutes = hours * 60 + currentMinutes + minutes;
      const newHours = Math.floor(totalMinutes / 60);
      const newMinutes = totalMinutes % 60;
      return `${newHours.toString().padStart(2, '0')}:${newMinutes
        .toString()
        .padStart(2, '0')}:00`;
    });
  };

  return (
    <Grid
      backgroundColor={isComplete ? 'gray.300' : 'gray.50'}
      width={'98vw'}
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
        {isComplete ? (
          <Text textAlign="center" fontWeight="bold" fontSize="md" minW="48px">
            Deadline Reached!
          </Text>
        ) : (
          <Text textAlign="center" fontWeight="bold" fontSize="md" minW="48px">
            {timeLeft}
          </Text>
        )}
      </GridItem>
      <GridItem colSpan={1} textAlign="right">
        {!isRunning && !isComplete && (
          <Button size="sm" colorScheme="red" onClick={handleStart}>
            Start
          </Button>
        )}

        <CustomMenu
          handlePause={handlePause}
          handleAddMinutes={handleAddMinutes}
          handleReset={handleReset}
          handleStart={handleStart}
          isRunning={isRunning}
          isComplete={isComplete}
          handleRemove={() => handleRemove(timerData.id)}
        />
      </GridItem>
    </Grid>
  );
}

export default Timer;

const CustomMenu = ({
  handlePause,
  handleAddMinutes,
  handleReset,
  handleStart,
  isRunning,
  isComplete,
  handleRemove,
}) => {
  const [menuItems, setMenuItems] = useState([
    {
      label: 'Reset',
      onClick: handleReset,
    },
    {
      label: 'Start',
      onClick: handleStart,
      isHidden: isRunning || isComplete,
    },
    {
      label: 'Pause',
      onClick: handlePause,
      isHidden: !isRunning,
    },
    {
      label: 'Remove',
      onClick: handleRemove,
    },
    {
      label: 'Add 5 mins',
      onClick: () => handleAddMinutes(5),
    },
  ]);

  const visibleMenuItems = menuItems.filter(menuItem => !menuItem.isHidden);

  return (
    <Menu>
      <MenuButton
        ml={2}
        as={IconButton}
        icon={<FaBars />}
        variant="outline"
        size="sm"
        _hover={{ backgroundColor: 'gray.100' }}
        _active={{ backgroundColor: 'gray.200' }}
      />
      <MenuList size="sm">
        {visibleMenuItems.map(menuItem => (
          <MenuItem key={menuItem.label} onClick={menuItem.onClick}>
            {menuItem.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
