import { configureStore } from '@reduxjs/toolkit';
import { createApi, setupInterceptors } from '../shared/api';
import { createOnUnauthorized } from './on-unauthorized';
import { rootReducer } from './root-reducer';

export const api = createApi();

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: api },
      }),
  });

  setupInterceptors(api, createOnUnauthorized(store.dispatch));

  return store;
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
