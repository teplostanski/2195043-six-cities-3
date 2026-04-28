import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './reducers/offersSlice';
import { createApi } from '../shared/api';

export const api = createApi();

const rootReducer = { offersReducer };

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: api },
      }),
  });

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
