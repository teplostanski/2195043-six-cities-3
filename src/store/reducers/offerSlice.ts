import { createSlice } from '@reduxjs/toolkit';
import type { OfferFull } from '../../shared/types';
import { fetchOfferAction } from '../api/actions';

type OfferState = {
  offer: OfferFull | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OfferState = {
  offer: null,
  isLoading: false,
  error: null,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.offer = null;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось загрузить оффер';
      });
  },
  reducers: {},
});

export const offerReducer = offerSlice.reducer;
