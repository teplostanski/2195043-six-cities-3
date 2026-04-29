import { apiPathsMap } from '../../shared/constants';
import type {
  Comment,
  LoginData,
  OfferFull,
  OfferPreview,
  UserInfo,
} from '../../shared/types';
import { createAppAsyncThunk } from '../create-app-async-thunk';

export const fetchOffersListAction = createAppAsyncThunk<
  OfferPreview[],
  undefined
>('offers/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(apiPathsMap.offers);
  return data;
});

export const fetchOfferAction = createAppAsyncThunk<OfferFull, string>(
  'offer/fetchOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferFull>(apiPathsMap.offer(id));
    return data;
  },
);

export const fetchNearbyOfferAction = createAppAsyncThunk<OfferFull[], string>(
  'offer/fetchNearbyOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferFull[]>(apiPathsMap.nearby(id));
    return data;
  },
);

export const fetchCommentsAction = createAppAsyncThunk<Comment[], string>(
  'comments/fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<Comment[]>(apiPathsMap.comments(id));
    return data;
  },
);

export const checkAuthAction = createAppAsyncThunk<UserInfo, undefined>(
  'auth/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserInfo>(apiPathsMap.login);
    return data;
  },
);

export const loginAction = createAppAsyncThunk<UserInfo, LoginData>(
  'auth/login',
  async (loginData, { extra: api }) => {
    const { data } = await api.post<UserInfo>(apiPathsMap.login, loginData);
    return data;
  },
);

export const logoutAction = createAppAsyncThunk<void, void>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(apiPathsMap.logout);
  },
);
