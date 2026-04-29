import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CityName, OfferPreview } from '../../shared/types';
import { fetchOffersListAction } from '../async-actions';

type OffersState = {
  currentCity: CityName;
  offers: OfferPreview[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  currentCity: 'Paris',
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
      .addCase(fetchOffersListAction.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось список офферов';
      });
  },
});

export const { setCurrentCity } = offersListSlice.actions;
export const offersListReducer = offersListSlice.reducer;
