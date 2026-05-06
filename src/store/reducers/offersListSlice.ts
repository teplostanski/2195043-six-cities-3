import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CityName, OfferPreview } from '../../shared/types';
import { fetchOffersListAction } from '../async-actions';
import { cities } from '../../shared/constants';
import { type HttpError, UNKNOWN_HTTP_ERROR } from '../../shared/http-error';
import type { RootState } from '../store';

type OffersState = {
  currentCity: CityName;
  offers: OfferPreview[];
  isLoading: boolean;
  error: HttpError | null;
};

const initialState: OffersState = {
  currentCity: cities.paris,
  offers: [],
  isLoading: false,
  error: null,
};

const offersListSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCurrentCity(state, action: PayloadAction<CityName>) {
      state.currentCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersListAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.offers = [];
      })
      .addCase(fetchOffersListAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersListAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
  },
});

export const { setCurrentCity } = offersListSlice.actions;
export const offersListReducer = offersListSlice.reducer;
export const selectOffersListState = (state: RootState) =>
  state.offersListReducer;

export const selectCurrentCity = (state: RootState) =>
  selectOffersListState(state).currentCity;
export const selectOffers = (state: RootState) =>
  selectOffersListState(state).offers;
export const selectOffersListIsLoading = (state: RootState) =>
  selectOffersListState(state).isLoading;
export const selectOffersListError = (state: RootState) =>
  selectOffersListState(state).error;
