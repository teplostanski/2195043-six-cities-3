import type { AppDispatch } from './store';
import { clearAuthData } from './reducers/authSlice';

export const createOnUnauthorized = (dispatch: AppDispatch) => () => {
  dispatch(clearAuthData());
};