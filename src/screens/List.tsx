import React, { useState, useEffect, useCallback } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ListRenderItem,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParams } from '../types/types';
import { Appearance, Character } from '../interfaces/interfaces';
import { Routes } from '../enums/enums';

const List: React.FC<NativeStackScreenProps<NavigatorParams>> = ({ navigation }) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const [characters, setCharacters] = useState<Character[]>([])

    const [open, setOpen] = useState<boolean>(false)
    const [appearances, setAppearances] = useState<Appearance[]>([])
    const [selectedAppearance, setSelectedAppearance] = useState<number | null>(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        fetch('https://breakingbadapi.com/api/characters')
            .then(res => res.json())
            .then((res: Character[]) => {
                if (res.length) {
                    setCharacters(res)
                    createAppearancesList(res)
                    setHasError(false)
                } else setHasError(true)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setHasError(true)
                setLoading(false)
            })
    }

    const createAppearancesList = (characters: Character[]) => {
        let appearancesMap: { [key: string]: number; } = {}
        for (let i = 0; i < characters.length; i++) {
            const { appearance } = characters[i];
            if (appearance)
                for (let j = 0; j < appearance.length; j++) {
                    appearancesMap[`${appearance[j]}`] = appearance[j]
                }
        }

        let appearances: Appearance[] = []
        appearances.push({ label: "*", value: 0 })
        Object.keys(appearancesMap).map(key => {
            appearances.push({
                label: key,
                value: appearancesMap[key]
            })
        })

        setAppearances(appearances)
    }

    const getFilteredCharacters = useCallback(() => {
        let filteredCharacters = characters
        if (selectedAppearance)
            filteredCharacters = filteredCharacters.filter(character => character.appearance?.includes(selectedAppearance))
        if (searchText)
            filteredCharacters = filteredCharacters.filter(character => character.name?.toLowerCase().includes(searchText.toLowerCase()))
        return filteredCharacters
    }, [characters, searchText, selectedAppearance])

    const inputSection = () => {
        return (
            <View style={{ width: '100%', height: 50, marginBottom: 10, flexDirection: 'row' }}>
                <View style={{
                    flex: 1, alignItems: 'center', flexDirection: 'row',
                    backgroundColor: 'white',
                    borderWidth: 1, borderRadius: 10,
                    paddingHorizontal: 10, paddingVertical: 5
                }}>
                    <TextInput
                        style={{ flex: 1, height: 30, fontSize: 16, padding: 0 }}
                        placeholder={"Enter name to search"}
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                    />
                    {searchText && <TouchableOpacity style={{
                        paddingVertical: 5, paddingHorizontal: 10, marginLeft: 10,
                        backgroundColor: 'silver', borderRadius: 100
                    }} onPress={() => setSearchText("")}>
                        <Text style={{ fontSize: 10, color: 'black' }}>X</Text>
                    </TouchableOpacity>}
                </View>
                <View style={{ marginLeft: 10, maxWidth: 60 }}>
                    <DropDownPicker
                        containerStyle={{
                            height: 40,
                            padding: 0
                        }}
                        open={open}
                        setOpen={setOpen}
                        items={appearances}
                        setItems={setAppearances}
                        value={selectedAppearance}
                        setValue={setSelectedAppearance}
                        placeholder={""}
                    />
                </View>
            </View>
        )
    }

    const renderItem: ListRenderItem<Character> = ({ item }) => (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                marginBottom: 10
            }}
            onPress={() => navigation.navigate(Routes.Details, { character: item })}>
                {item.img && <Image resizeMethod='resize' resizeMode='contain' style={{ height: 200, width: '100%', backgroundColor: 'black' }} source={{ uri: item.img }} />}
                <Text style={{ width: '100%', backgroundColor: 'white',
                color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {item.name}
                </Text>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {loading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                    <Text style={{ marginTop: 10, color: 'black', fontWeight: 'bold' }}>Loading...</Text>
                </View>
                : hasError
                    ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Something went wrong!</Text>
                        <TouchableOpacity onPress={() => getData()}>
                            <Text style={{ marginTop: 10, color: 'blue' }}>Try again</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={{ flex: 1 }}>
                        {inputSection()}
                        {getFilteredCharacters().length
                            ? <FlatList<Character>
                                showsVerticalScrollIndicator={false}
                                data={getFilteredCharacters()}
                                renderItem={renderItem}
                            />
                            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>
                                    No match found for
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}> {searchText} </Text>
                                    !
                                </Text>
                            </View>
                        }
                    </View>
            }
        </View>
    )
}

export default List