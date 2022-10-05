import {View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Character} from '../interfaces/interfaces';
import {NavigatorParams} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Center, Image, Text} from 'native-base';

const CharacterDetails: FC<NativeStackScreenProps<NavigatorParams>> = ({
  route,
}) => {
  const [characterDetails, setCharacterdetails] = useState<
    Character | undefined
  >({});
  const data = useSelector((state: RootState) => state.characters);
  let {characters} = data;
  const [isShrinkImage, setIsShrinkImage] = useState<boolean>(false);

  useEffect(() => {
    if (characters && characters) {
      setCharacterdetails(
        characters.find(
          (char: Character) => char.char_id === route.params?.itemId,
        ),
      );
    }

    let timer = setTimeout(() => {
      setIsShrinkImage(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [characters, route]);

  return (
    <View>
      <Text>
        {characterDetails !== undefined && (
          <Box>
            <View>
              <Image
                //   size="2xl"
                //   width="full"

                minW={isShrinkImage ? 'full' : 'full'}
                h={isShrinkImage ? '4/5' : 'full'}
                source={{uri: characterDetails.img}}
                alt={'character-image' + characterDetails.char_id}
              />
            </View>
            {isShrinkImage && (
              <Box px="8" mt="-100">
                <Center>
                  <Text
                    fontSize="30"
                    color="coolGray.500"
                    fontWeight="bold"
                    mb="1">
                    {characterDetails.name}
                  </Text>
                  <Text
                    fontSize="20"
                    fontWeight="bold"
                    color="coolGray.500"
                    mb="2">
                    ({characterDetails.nickname})
                  </Text>
                  <Text
                    fontSize="20"
                    fontWeight="bold"
                    color="coolGray.500"
                    mb="2">
                    {characterDetails.occupation}
                  </Text>

                  <Text
                    fontSize="20"
                    fontWeight="bold"
                    color="coolGray.500"
                    mb="2">
                    {characterDetails.status}
                  </Text>
                </Center>
              </Box>
            )}
          </Box>
        )}
      </Text>
    </View>
  );
};

export default CharacterDetails;
