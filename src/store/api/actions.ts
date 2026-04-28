import type { OfferFull, OfferPreview } from '../../shared/types';
import { createAppAsyncThunk } from '../create-app-async-thunk';

const OFFERS_PATH = '/offers';

export const fetchOffersListAction = createAppAsyncThunk<OfferPreview[], undefined>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(OFFERS_PATH);
    return data;
  }
);

export const fetchOfferAction = createAppAsyncThunk<OfferFull, string>(
  'offers/fetchOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferFull>(`${OFFERS_PATH}/${id}`);
    return data;
  }
);
