import { createSlice } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';
import { type HttpError, UNKNOWN_HTTP_ERROR } from '../../shared/http-error';
import type { OfferFull } from '../../shared/types';
import { fetchNearbyOfferAction, fetchOfferAction } from '../async-actions';
import type { RootState } from '../store';

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
        state.isOfferNotFound =
          action.payload?.status === StatusCodes.NOT_FOUND;
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
      .addCase(fetchNearbyOfferAction.rejected, (state, action) => {
        state.isNearbyLoading = false;
        state.nearbyError = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
  },
  reducers: {},
});

export const offerReducer = offerSlice.reducer;
export const selectOfferState = (state: RootState) => state.offerReducer;

export const selectOffer = (state: RootState) => selectOfferState(state).offer;
export const selectNearbyOffers = (state: RootState) =>
  selectOfferState(state).nearby;
export const selectIsOfferLoading = (state: RootState) =>
  selectOfferState(state).isOfferLoading;
export const selectIsOfferNotFound = (state: RootState) =>
  selectOfferState(state).isOfferNotFound;
export const selectOfferError = (state: RootState) =>
  selectOfferState(state).offerError;
export const selectIsNearbyLoading = (state: RootState) =>
  selectOfferState(state).isNearbyLoading;
export const selectNearbyError = (state: RootState) =>
  selectOfferState(state).nearbyError;
