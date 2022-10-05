import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../../interfaces/interfaces';
import { RootState } from '../../store';
import { reducerName, initialState } from "./characters.initialState";
import { fetchCharacters } from './characters.thunk';

export const characterSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    deleteCharacter: (state, action) => {
      state.characters = state.characters.filter(
        (character: Character) => character.char_id !== action.payload.char_id,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchCharacters.fulfilled,
      (state, action: PayloadAction<Character[]>) => {
        state.characters = action?.payload || [];
        state.isLoading = false
      },
    );
  }
});

export const {
  deleteCharacter
} = characterSlice.actions;

export const getCharacters = (state: RootState) => state.charactersReducer.characters

export default characterSlice.reducer;
