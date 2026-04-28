import { apiPathsMap } from '../../shared/constants';
import type { Comment, OfferFull, OfferPreview } from '../../shared/types';
import { createAppAsyncThunk } from '../create-app-async-thunk';

export const fetchOffersListAction = createAppAsyncThunk<OfferPreview[], undefined>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(apiPathsMap.offers);
    return data;
  }
);

export const fetchOfferAction = createAppAsyncThunk<OfferFull, string>(
  'offer/fetchOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferFull>(apiPathsMap.offer(id));
    return data;
  }
);

export const fetchCommentsAction = createAppAsyncThunk<Comment[], string>(
  'comments/fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<Comment[]>(apiPathsMap.comments(id));
    return data;
  }
);

