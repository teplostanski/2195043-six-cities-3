import { createSlice } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';
import { type HttpError, UNKNOWN_HTTP_ERROR } from '../../shared/http-error';
import type { OfferFull } from '../../shared/types';
import { fetchNearbyOfferAction, fetchOfferAction } from '../async-actions';

type OfferState = {
  offer: OfferFull | null;
  nearby: OfferFull[] | null;
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
  offerError: HttpError | null;
  isNearbyLoading: boolean;
  nearbyError: HttpError | null;
};

const initialState: OfferState = {
  offer: null,
  nearby: null,
  isOfferLoading: false,
  isOfferNotFound: false,
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
        state.isOfferNotFound = false;
        state.offerError = null;
        state.offer = null;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.isOfferLoading = false;
        state.isOfferNotFound = action.payload?.status === StatusCodes.NOT_FOUND;
        state.offerError = action.payload ?? UNKNOWN_HTTP_ERROR;
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
        state.nearbyError = UNKNOWN_HTTP_ERROR;
      });
  },
  reducers: {},
});

export const offerReducer = offerSlice.reducer;
