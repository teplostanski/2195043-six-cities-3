import { removeAuthToken, saveAuthToken } from '../shared/auth-token';
import { apiPaths } from '../shared/constants';
import type { HttpError } from '../shared/http-error';
import type {
  Comment,
  LoginData,
  OfferFull,
  OfferPreview,
  UserInfo,
} from '../shared/types';
import { createAppAsyncThunk } from './create-app-async-thunk';
import { createSafeThunkPayload } from './create-safe-thunk-payload';

type HttpErrorRejectConfig = { rejectValue: HttpError };

export const fetchOffersListAction = createAppAsyncThunk<
  OfferPreview[],
  void,
  HttpErrorRejectConfig
>(
  'offers/fetchOffers',
  createSafeThunkPayload(async (_, api) => {
    const { data } = await api.get<OfferPreview[]>(apiPaths.offers);
    return data;
  }),
);

export const fetchOfferAction = createAppAsyncThunk<
  OfferFull,
  string,
  HttpErrorRejectConfig
>(
  'offer/fetchOffer',
  createSafeThunkPayload(async (id, api) => {
    const { data } = await api.get<OfferFull>(apiPaths.offer(id));
    return data;
  }),
);

export const fetchNearbyOfferAction = createAppAsyncThunk<
  OfferFull[],
  string,
  HttpErrorRejectConfig
>(
  'offer/fetchNearbyOffer',
  createSafeThunkPayload(async (id, api) => {
    const { data } = await api.get<OfferFull[]>(apiPaths.nearby(id));
    return data;
  }),
);

export const fetchCommentsAction = createAppAsyncThunk<
  Comment[],
  string,
  HttpErrorRejectConfig
>(
  'comments/fetchComments',
  createSafeThunkPayload(async (id, api) => {
    const { data } = await api.get<Comment[]>(apiPaths.comments(id));
    return data;
  }),
);

export const checkAuthAction = createAppAsyncThunk<
  UserInfo,
  void,
  HttpErrorRejectConfig
>(
  'auth/checkAuth',
  createSafeThunkPayload(async (_arg, api) => {
    const { data } = await api.get<UserInfo>(apiPaths.login);
    saveAuthToken(data.token);
    return data;
  }),
);

export const loginAction = createAppAsyncThunk<
  UserInfo,
  LoginData,
  HttpErrorRejectConfig
>(
  'auth/login',
  createSafeThunkPayload(async (loginData, api) => {
    const { data } = await api.post<UserInfo>(apiPaths.login, loginData);
    saveAuthToken(data.token);
    return data;
  }),
);

export const logoutAction = createAppAsyncThunk<
  void,
  void,
  HttpErrorRejectConfig
>(
  'auth/logout',
  createSafeThunkPayload(async (_, api) => {
    await api.delete(apiPaths.logout);
    removeAuthToken();
  }),
);
