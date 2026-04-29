import { configureStore } from '@reduxjs/toolkit';
import { createApi } from './api/config';
import { authReducer } from './reducers/authSlice';
import { commentsReducer } from './reducers/commentsSlice';
import { offerReducer } from './reducers/offerSlice';
import { offersListReducer } from './reducers/offersListSlice';

export const api = createApi();

const rootReducer = {
  offersListReducer,
  offerReducer,
  commentsReducer,
  authReducer,
};

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
