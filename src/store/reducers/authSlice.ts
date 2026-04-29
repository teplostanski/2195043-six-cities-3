import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserInfo } from '../../shared/types';
import { checkAuthAction, loginAction, logoutAction } from '../api/actions';

type AuthorizationStatus = 'UNKNOWN' | 'AUTH' | 'NO_AUTH';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  authorizationStatus: 'UNKNOWN',
  userInfo: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
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
        state.authorizationStatus = 'AUTH';
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
        state.error = 'Не удалось загрузить информацию о пользователе';
      });
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = 'AUTH';
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
        state.error = 'Не удалось авторизоваться';
      });
    builder
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
        state.userInfo = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось разлогиньться';
      });
  },
});

export const { setAuthorizationStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
