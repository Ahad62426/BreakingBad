import {combineReducers, configureStore} from '@reduxjs/toolkit';
import CharacterReducer from './reducers/CharacterReducer';

const RootReducer = combineReducers({
  charactersReducer: CharacterReducer,
});

const store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
export default store;
