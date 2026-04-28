import { createSlice } from '@reduxjs/toolkit';
import type { Comment } from '../../shared/types';
import { fetchCommentsAction } from '../api/actions';

type commentsState = {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
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
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось загрузить комментарии';
      });
  },
  reducers: {},
});

export const commentsReducer = commentsSlice.reducer;
