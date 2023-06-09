import React from 'react';
import { VStack } from '@chakra-ui/react';
import Timer from './Timer';

const TimerList = ({ data, handleRemove }) => {
  const sortedData = data.sort((a, b) => {
    const aTimeLeft = a.timeSet
      .split(':')
      .reduce((acc, time) => 60 * acc + +time, 0);
    const bTimeLeft = b.timeSet
      .split(':')
      .reduce((acc, time) => 60 * acc + +time, 0);
    return aTimeLeft - bTimeLeft;
  });

  return (
    <VStack width={'100%'} spacing={2} bg="lightgreen">
      {sortedData.map(timer => {
        return (
          <Timer timerData={timer} key={timer.id} handleRemove={handleRemove} />
        );
      })}
    </VStack>
  );
};

export default TimerList;
