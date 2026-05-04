import type { CityName, Comment, OfferPreview } from '../shared/types';

export const selectOffersByCity = (offers: OfferPreview[], city: CityName) =>
  offers.filter((offer) => offer.city.name === city);

export const sortComments = (comments: Comment[]) =>
  comments.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
