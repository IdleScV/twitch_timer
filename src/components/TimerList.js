import React from 'react';
import { VStack } from '@chakra-ui/react';
import Timer from './Timer';

const TimerList = ({ data }) => {
  return (
    <VStack width={'100%'} spacing={2}>
      {data.map(timer => {
        return <Timer timerData={timer} />;
      })}
    </VStack>
  );
};

export default TimerList;
