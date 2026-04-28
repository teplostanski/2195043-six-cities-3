import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CityName, OfferPreview } from '../../shared/types';

type Offers = {
  currentCity: CityName;
  offers: OfferPreview[];
};

const initialState: Offers = {
  currentCity: 'Paris',
  offers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<OfferPreview[]>) {
      state.offers = action.payload;
    },
    setCurrentCity(state, action: PayloadAction<CityName>) {
      state.currentCity = action.payload;
    },
  },
});

export const { setOffers, setCurrentCity } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
