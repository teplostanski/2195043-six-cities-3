import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CityName, OfferFull, OfferPreview } from '../../shared/types';
import { fetchOfferAction, fetchOffersListAction } from '../api/actions';

type OffersState = {
  currentCity: CityName;
  offers: OfferPreview[];
  offer: OfferFull | null;
};

const initialState: OffersState = {
  currentCity: 'Paris',
  offers: [],
  offer: null
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
    builder.addCase(fetchOffersListAction.fulfilled, (state, action) => {
      state.offers = action.payload;
    });
    builder.addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
    });
  },
});

export const { setCurrentCity } = offersListSlice.actions;
export const offersListReducer = offersListSlice.reducer;
