import type { OfferPreview } from '../shared/types';
import { createAppAsyncThunk } from './create-app-async-thunk';

const OFFERS_PATH = '/offers';

export const fetchOffersAction = createAppAsyncThunk<OfferPreview[], undefined>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(OFFERS_PATH);
    return data;
  }
);
