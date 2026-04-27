import type { CityName, OfferPreview } from '../../shared/types';

export const selectOffersByCity = (offers: OfferPreview[], city: CityName) =>
  offers.filter((offer) => offer.city.name === city);
