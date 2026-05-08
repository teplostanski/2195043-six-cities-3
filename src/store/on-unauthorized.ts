import { removeAuthToken } from '../shared/auth-token';
import type { AppDispatch } from './store';
import { clearAuthData } from './reducers/auth-slice';

export const createOnUnauthorized = (dispatch: AppDispatch) => () => {
  removeAuthToken();
  dispatch(clearAuthData());
};
