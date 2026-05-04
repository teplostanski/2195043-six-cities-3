import { createSlice } from '@reduxjs/toolkit';
import type { Comment } from '../../shared/types';
import { fetchCommentsAction } from '../async-actions';
import { type HttpError, UNKNOWN_HTTP_ERROR } from '../../shared/http-error';

type commentsState = {
  comments: Comment[];
  isLoading: boolean;
  error: HttpError | null;
};

const initialState: commentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.comments = [];
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
  },
  reducers: {},
});

export const commentsReducer = commentsSlice.reducer;
