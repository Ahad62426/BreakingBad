import {characterInitialState} from './../../interfaces/reducerInterfaces';
import {createSlice} from '@reduxjs/toolkit';
import {Character} from '../../interfaces/interfaces';

const initialState: characterInitialState = {
  characters: [],
  isLoading: true,
};
export const characterSlice = createSlice({
  name: 'chararters',
  initialState,
  reducers: {
    getCharacter: (state, action) => {
      state.characters = action.payload;
      state.isLoading = false;
    },
    deleteCharacter: (state, action) => {
      state.characters = state.characters.filter(
        (character: Character) => character.char_id !== action.payload.char_id,
      );
    },
  },
});

export const {getCharacter, deleteCharacter} = characterSlice.actions;
export default characterSlice.reducer;
