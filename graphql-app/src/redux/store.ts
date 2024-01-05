import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';

const rootReducer = combineReducers({
  userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
