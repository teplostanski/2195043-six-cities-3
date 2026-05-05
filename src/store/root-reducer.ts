import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authSlice';
import { commentsReducer } from './reducers/commentsSlice';
import { offerReducer } from './reducers/offerSlice';
import { offersListReducer } from './reducers/offersListSlice';

export const rootReducer = combineReducers({
  offersListReducer,
  offerReducer,
  commentsReducer,
  authReducer,
});
