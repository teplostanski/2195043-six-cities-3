import { createSlice } from '@reduxjs/toolkit';
import type { OfferFull } from '../../shared/types';
import { fetchNearbyOfferAction, fetchOfferAction } from '../async-actions';

type OfferState = {
  offer: OfferFull | null;
  nearby: OfferFull[] | null;
  isOfferLoading: boolean;
  offerError: string | null;
  isNearbyLoading: boolean;
  nearbyError: string | null;
};

const initialState: OfferState = {
  offer: null,
  nearby: null,
  isOfferLoading: false,
  offerError: null,
  isNearbyLoading: false,
  nearbyError: null,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
        state.offerError = null;
        state.offer = null;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.offerError = 'Не удалось загрузить оффер';
      });
    builder
      .addCase(fetchNearbyOfferAction.pending, (state) => {
        state.isNearbyLoading = true;
        state.nearbyError = null;
        state.nearby = null;
      })
      .addCase(fetchNearbyOfferAction.fulfilled, (state, action) => {
        state.isNearbyLoading = false;
        state.nearby = action.payload;
      })
      .addCase(fetchNearbyOfferAction.rejected, (state) => {
        state.isNearbyLoading = false;
        state.nearbyError = 'Не удалось загрузить офферы по близости';
      });
  },
  reducers: {},
});

export const offerReducer = offerSlice.reducer;
