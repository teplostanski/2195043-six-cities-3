import { createSlice } from '@reduxjs/toolkit';
import { type HttpError, UNKNOWN_HTTP_ERROR } from '../../shared/http-error';
import type { RootState } from '../store';
import { OfferPreview } from '../../shared/types';
import { changeFavoriteAction, fetchFavoritesAction } from '../async-actions';

type FavoritesState = {
  favorites: OfferPreview[];
  favoritesCount: number;
  isLoading: boolean;
  isSubmitting: boolean;
  fetchError: HttpError | null;
  submitError: HttpError | null;
};

const initialState: FavoritesState = {
  favorites: [],
  favoritesCount: 0,
  isLoading: false,
  isSubmitting: false,
  fetchError: null,
  submitError: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        state.favoritesCount = state.favorites.length;
      })
      .addCase(fetchFavoritesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
    builder
      .addCase(changeFavoriteAction.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(changeFavoriteAction.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitError = null;
      })
      .addCase(changeFavoriteAction.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const selectFavoritesState = (state: RootState) =>
  state.favoritesReducer;

export const selectFavorites = (state: RootState) =>
  selectFavoritesState(state).favorites;
export const selectFavoritesCount = (state: RootState) =>
  selectFavoritesState(state).favoritesCount;
export const selectFavoritesIsLoading = (state: RootState) =>
  selectFavoritesState(state).isLoading;
export const selectFavoritesIsSubmitting = (state: RootState) =>
  selectFavoritesState(state).isSubmitting;
export const selectFavoritesFetchError = (state: RootState) =>
  selectFavoritesState(state).fetchError;
export const selectFavoritesSubmitError = (state: RootState) =>
  selectFavoritesState(state).submitError;
