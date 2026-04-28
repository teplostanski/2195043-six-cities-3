import type { AxiosInstance } from 'axios';
import type { AppDispatch, RootState } from './store';

export type ThunkExtraArgument = AxiosInstance;

export type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: RootState;
  extra: ThunkExtraArgument;
};
