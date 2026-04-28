import { configureStore } from '@reduxjs/toolkit';
import { createApi } from './api/config';
import { offersListReducer } from './reducers/offersListSlice';
import { offerReducer } from './reducers/offerSlice';
import { commentsReducer } from './reducers/commentsSlice';

export const api = createApi();

const rootReducer = { offersListReducer, offerReducer, commentsReducer };

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
