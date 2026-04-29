import type { AppDispatch } from './store';
import { setAuthorizationStatus } from './reducers/authSlice';

export const createOnUnauthorized = (dispatch: AppDispatch) => () => {
  dispatch(setAuthorizationStatus('NO_AUTH'));
};