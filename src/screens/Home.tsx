import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { fetchCharacters } from '../redux/reducers/charactersReducer/characters.thunk';
import { getCharacters } from '../redux/reducers/charactersReducer/characters.reducer';
import { Character } from '../interfaces/interfaces';
import { Box, Heading, HStack, ScrollView, Spinner, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParams } from '../types/types';
import CharacterCard from '../components/CharacterCard';

const Home: FC<NativeStackScreenProps<NavigatorParams>> = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const characters = useAppSelector(getCharacters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters()).unwrap()
    .finally(() => setIsLoading(false))
    .catch(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <ScrollView>
      <View mx="3" my="2">
        {isLoading && (
          <Box h="full" alignContent="center">
            <HStack space={2} justifyContent="center">
              <Spinner
                color="coolGray.500"
                accessibilityLabel="Loading posts"
              />
              <Heading color="coolGray.500" fontSize="md">
                Loading
              </Heading>
            </HStack>
          </Box>
        )}
        {characters &&
          characters.map((character: Character) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CharacterDetails', {
                  itemId: character.char_id,
                })
              }
              key={character.char_id}>
              <CharacterCard {...character} />
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default Home;
