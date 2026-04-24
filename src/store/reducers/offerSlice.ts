import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { offersMock } from '../../mocks/offers';
import { OfferPreview } from '../../shared/types';

type Offer = {
  city: string;
  offers: OfferPreview[];
  count: number;
};

const initialState: Offer = {
  city: 'Paris',
  offers: [...offersMock],
  count: 0,
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    inc(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
  },
});

export default offerSlice.reducer;
