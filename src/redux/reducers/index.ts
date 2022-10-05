import { combineReducers } from '@reduxjs/toolkit';
import charactersReducer from './charactersReducer/characters.reducer';

const RootReducer = combineReducers({
  charactersReducer
});

export default RootReducer