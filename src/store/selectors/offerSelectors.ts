import type { OfferPreview } from '../../shared/types';

export const selectOffersByCity = (offers: OfferPreview[], city: string) =>
  offers.filter((offer) => offer.city.name === city);
