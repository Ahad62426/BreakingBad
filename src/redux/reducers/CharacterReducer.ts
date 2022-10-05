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
    setCharacters: (state, action) => {
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

export const {
  setCharacters, deleteCharacter
} = characterSlice.actions;

export default characterSlice.reducer;
