import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferPreview } from '../../shared/types';

type Offers = {
  city: string;
  offers: OfferPreview[];
};

const initialState: Offers = {
  city: 'Paris',
  offers: [],
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<OfferPreview[]>) {
      state.offers = action.payload;
    },
  },
});

export default offerSlice.reducer;
