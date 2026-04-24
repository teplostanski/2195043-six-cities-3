import { configureStore } from '@reduxjs/toolkit';
import offerReducer from './reducers/offerSlice';

const rootReducer = { offerReducer };

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
