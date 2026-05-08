import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth-slice';
import { commentsReducer } from './reducers/comments-slice';
import { offerReducer } from './reducers/offer-slice';
import { offersListReducer } from './reducers/offers-list-slice';
import { favoritesReducer } from './reducers/favorites-slice';

export const rootReducer = combineReducers({
  offersListReducer,
  offerReducer,
  commentsReducer,
  authReducer,
  favoritesReducer
});
