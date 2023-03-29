import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';

const AddTimer = ({ onAddTimer }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [formData, setFormData] = useState({
    taskName: '',
    taskOwner: '',
    timeSet: '00:00:00',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSetChange = e => {
    const { value } = e.target;
    const regex = /^([0-9]{0,2}):([0-5]?[0-9]):([0-5]?[0-9])$/;
    if (regex.test(value) || value === '') {
      setFormData({ ...formData, timeSet: value });
    }
  };

  const handleAddButtonClick = () => {
    onAddTimer(formData);
    setFormData({
      taskName: '',
      taskOwner: '',
      timeSet: '00:00:00',
    });
  };

  return (
    <Box
      my={2}
      background="gray.50"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      mb={10}
    >
      <IconButton
        icon={isOpen ? <CloseIcon /> : <AddIcon />}
        aria-label={isOpen ? 'Close Timer' : 'Add Timer'}
        variant="ghost"
        onClick={onToggle}
      />
      {isOpen && (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" my={2}>
          <Stack spacing={4}>
            <FormControl id="taskName">
              <FormLabel>Task Name</FormLabel>
              <Input
                placeholder="Task Name"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="taskOwner">
              <FormLabel>Task Owner</FormLabel>
              <Input
                placeholder="Task Owner"
                name="taskOwner"
                value={formData.taskOwner}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="task-duration" mb="4" isRequired>
              <FormLabel>Task Duration (hh:mm:ss)</FormLabel>
              <Input
                type="text"
                value={formData.timeSet}
                onChange={handleTimeSetChange}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddButtonClick}>
              Add Timer
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default AddTimer;
