import { characterInitialState } from '../../../interfaces/reducerInterfaces';

export const reducerName = "charactersReducer"

export const initialState: characterInitialState = {
    characters: [],
    isLoading: true,
};