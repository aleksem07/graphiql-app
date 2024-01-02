import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import languageReducer from './lang/languageSlice';

const rootReducer = combineReducers({
  userSlice,
  language: languageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
