import { removeAuthToken, saveAuthToken } from '../shared/auth-token';
import { ApiPaths } from '../shared/constants';
import type { HttpError } from '../shared/http-error';
import type {
  Comment,
  CommentSendData,
  FavoriteChangeData,
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
    const { data } = await api.get<OfferPreview[]>(ApiPaths.Offers);
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
    const { data } = await api.get<OfferFull>(ApiPaths.Offer(id));
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
    const { data } = await api.get<OfferFull[]>(ApiPaths.Nearby(id));
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
    const { data } = await api.get<Comment[]>(ApiPaths.Comments(id));
    return data;
  }),
);

export const sendCommentAction = createAppAsyncThunk<
  void,
  CommentSendData,
  HttpErrorRejectConfig
>(
  'comments/sendComment',
  createSafeThunkPayload(async (data, api) => {
    const { id, comment, rating } = data;
    await api.post<void>(ApiPaths.Comments(id), { comment, rating });
  }),
);

export const fetchFavoritesAction = createAppAsyncThunk<
  OfferPreview[],
  void,
  HttpErrorRejectConfig
>(
  'favorites/fetchFavorites',
  createSafeThunkPayload(async (_, api) => {
    const { data } = await api.get<OfferPreview[]>(ApiPaths.Favorite);
    return data;
  }),
);

export const changeFavoriteAction = createAppAsyncThunk<
  OfferFull,
  FavoriteChangeData,
  HttpErrorRejectConfig
>(
  'favorites/changeFavorite',
  createSafeThunkPayload(async ({ id, status }, api) => {
    const { data } = await api.post<OfferFull>(
      ApiPaths.SetFavoriteStatus(id, status),
    );
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
    const { data } = await api.get<UserInfo>(ApiPaths.Login);
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
    const { data } = await api.post<UserInfo>(ApiPaths.Login, loginData);
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
    await api.delete(ApiPaths.Logout);
    removeAuthToken();
  }),
);
