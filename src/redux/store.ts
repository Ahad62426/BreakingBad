import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./reducers";

const store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
export default store;
