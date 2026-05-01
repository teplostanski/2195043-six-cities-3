import { apiPaths } from '../shared/constants';
import axios from 'axios';
import {
  createHttpError,
  type HttpError,
  UNKNOWN_HTTP_ERROR,
} from '../shared/http-error';
import type {
  Comment,
  LoginData,
  OfferFull,
  OfferPreview,
  UserInfo,
} from '../shared/types';
import { createAppAsyncThunk } from './create-app-async-thunk';

export const fetchOffersListAction = createAppAsyncThunk<
  OfferPreview[],
  undefined
>('offers/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(apiPaths.offers);
  return data;
});

export const fetchOfferAction = createAppAsyncThunk<
  OfferFull,
  string,
  { rejectValue: HttpError }
>(
  'offer/fetchOffer',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferFull>(apiPaths.offer(id));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(createHttpError(error));
      }

      return rejectWithValue(UNKNOWN_HTTP_ERROR);
    }
  },
);

export const fetchNearbyOfferAction = createAppAsyncThunk<OfferFull[], string>(
  'offer/fetchNearbyOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferFull[]>(apiPaths.nearby(id));
    return data;
  },
);

export const fetchCommentsAction = createAppAsyncThunk<Comment[], string>(
  'comments/fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<Comment[]>(apiPaths.comments(id));
    return data;
  },
);

export const checkAuthAction = createAppAsyncThunk<
  UserInfo,
  undefined,
  { rejectValue: HttpError }
>(
  'auth/checkAuth',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<UserInfo>(apiPaths.login);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(createHttpError(error));
      }

      return rejectWithValue(UNKNOWN_HTTP_ERROR);
    }
  },
);

export const loginAction = createAppAsyncThunk<
  UserInfo,
  LoginData,
  { rejectValue: HttpError }
>(
  'auth/login',
  async (loginData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserInfo>(apiPaths.login, loginData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(createHttpError(error));
      }

      return rejectWithValue(UNKNOWN_HTTP_ERROR);
    }
  },
);

export const logoutAction = createAppAsyncThunk<void, void>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(apiPaths.logout);
  },
);
