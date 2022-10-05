import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setCharacters} from '../redux/reducers/CharacterReducer';
import {Character} from '../interfaces/interfaces';
import {Box, Heading, HStack, ScrollView, Spinner, View} from 'native-base';
import {config} from '../utils/Config';
import { TouchableOpacity } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParams} from '../types/types';
import CharacterCard from '../components/CharacterCard';

const Home: FC<NativeStackScreenProps<NavigatorParams>> = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.characters);
  let {characters, isLoading} = data;

  useEffect(() => {
    let fetchCharacters = async () => {
      let res = await fetch(`${config.API_URL}/characters`);
      let charactersData = await res.json();
      dispatch(setCharacters(charactersData));
    };
    fetchCharacters();
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
