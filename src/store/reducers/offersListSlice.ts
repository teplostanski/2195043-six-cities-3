import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CityName, OfferPreview } from '../../shared/types';
import { fetchOffersListAction } from '../api/actions';

type OffersState = {
  currentCity: CityName;
  offers: OfferPreview[];
};

const initialState: OffersState = {
  currentCity: 'Paris',
  offers: [],
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
  },
});

export const { setCurrentCity } = offersListSlice.actions;
export const offersListReducer = offersListSlice.reducer;
