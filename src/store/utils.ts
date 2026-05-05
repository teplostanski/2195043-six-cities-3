import type { CityName, Comment, OfferPreview, OfferSortType } from '../shared/types';

const offerSortStrategies = {
  popular: (offers: OfferPreview[]) => offers,
  'price-low-to-high': (offers: OfferPreview[]) =>
    offers.toSorted((a, b) => a.price - b.price),
  'price-high-to-low': (offers: OfferPreview[]) =>
    offers.toSorted((a, b) => b.price - a.price),
  'top-rated-first': (offers: OfferPreview[]) =>
    offers.toSorted((a, b) => b.rating - a.rating),
} satisfies Record<
  OfferSortType,
  (offers: OfferPreview[]) => OfferPreview[]
>;

export const sortOffers = (offers: OfferPreview[], sort: OfferSortType) =>
  offerSortStrategies[sort](offers);

export const selectOffersByCity = (offers: OfferPreview[], city: CityName) =>
  offers.filter((offer) => offer.city.name === city);

export const sortComments = (comments: Comment[]) =>
  comments.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
