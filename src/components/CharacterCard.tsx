import React from 'react';
import {Avatar, Box, Flex, Text} from 'native-base';
import {Character} from '../interfaces/interfaces';

const CharacterCard = ({name, img, occupation, status}: Character) => {
  return (
    <Box
      borderWidth="1"
      borderColor="coolGray.300"
      py="4"
      px="3"
      mb="4"
      shadow="2"
      borderRadius="md"
      overflow="hidden">
      <Flex direction="row" alignItems="center">
        <Avatar
          source={{uri: img}}
          size="lg"
          marginRight="4"
          borderWidth="4"
          borderColor="gray.200"
          borderRadius="full">
          {name?.split('')[0]}
        </Avatar>
        <Box pr="3">
          <Text fontSize="xl">{name}</Text>
          <Text fontSize="md">
            {occupation?.length ? occupation[0] : occupation}
          </Text>
          <Text>{status}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CharacterCard;
