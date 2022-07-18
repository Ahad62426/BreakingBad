import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigatorParams, RouteParams } from '../types/types';
import { Routes } from '../enums/enums';
import { Character } from '../interfaces/interfaces';

const Details: React.FC<NativeStackScreenProps<NavigatorParams>> = () => {

    const [character, setCharacter] = useState<Character | null>(null)

    const { params } = useRoute<RouteProp<RouteParams, Routes.Details>>();

    useEffect(() => {
        if (params && params.character)
            setCharacter(params.character)
    }, [params])

    return (
        <View style={styles.container}>
            {character ? <ScrollView contentInsetAdjustmentBehavior="automatic">
                {character.img && <Image resizeMethod='resize' resizeMode='contain' style={styles.image} source={{ uri: character.img }} />}
                {character.occupation && character.occupation.length
                    ? <View>
                        <Text style={styles.label}>Occupation</Text>
                        {character.occupation.map((item, index) => {
                            return (
                                <Text>{item}{(index !== (character?.occupation ? character.occupation.length : 0) - 1) ? ', ' : null}</Text>
                            )
                        })}
                    </View>
                    : null
                }
                
                <Text style={styles.label}>Status</Text>
                <Text>{character.status}</Text>
                
                <Text style={styles.label}>Nickname</Text>
                <Text>{character.nickname}</Text>

                {character.appearance && character.appearance.length
                    ? <View>
                        <Text style={styles.label}>Appearances</Text>
                        <View style={styles.rowView}>
                            {character.appearance.map((item, index) => {
                                return (
                                    <Text style={styles.appearance}>{item}</Text>
                                )
                            })}
                        </View>
                    </View>
                    : null
                }
            </ScrollView> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 1,
        backgroundColor: 'white'
    },
    image: {
        height: 300,
        width: '100%',
        backgroundColor: 'black'
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        marginTop: 10
    },
    rowView: {
        flexDirection: 'row'
    },
    appearance: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 100,
        backgroundColor: 'silver',
        marginVertical: 5,
        marginRight: 10
    }
})

export default Details