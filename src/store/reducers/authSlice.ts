import { createSlice } from '@reduxjs/toolkit';
import { authStatus } from '../../shared/constants';
import { type HttpError, UNKNOWN_HTTP_ERROR } from '../../shared/http-error';
import type { AuthorizationStatus, UserInfo } from '../../shared/types';
import { checkAuthAction, loginAction, logoutAction } from '../async-actions';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
  isLoading: boolean;
  error: HttpError | null;
};

const initialState: AuthState = {
  authorizationStatus: authStatus.unknown,
  userInfo: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthData(state) {
      state.authorizationStatus = authStatus.noAuth;
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = authStatus.auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = authStatus.noAuth;
        state.error = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = authStatus.auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = authStatus.noAuth;
        state.error = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
    builder
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.authorizationStatus = authStatus.noAuth;
        state.userInfo = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? UNKNOWN_HTTP_ERROR;
      });
  },
});

export const { clearAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
