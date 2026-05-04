import { createSlice } from '@reduxjs/toolkit';
import type { Comment } from '../../shared/types';
import { fetchCommentsAction, sendCommentAction } from '../async-actions';
import { type HttpError, UNKNOWN_HTTP_ERROR } from '../../shared/http-error';

type commentsState = {
  comments: Comment[];
  isLoading: boolean;
  isSubmitting: boolean;
  fetchError: HttpError | null;
  submitError: HttpError | null;
};

const initialState: commentsState = {
  comments: [],
  isLoading: false,
  isSubmitting: false,
  fetchError: null,
  submitError: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
        state.submitError = null;
        state.comments = [];
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
    builder
      .addCase(sendCommentAction.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(sendCommentAction.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitError = null;
      })
      .addCase(sendCommentAction.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
  },
  reducers: {},
});

export const commentsReducer = commentsSlice.reducer;
