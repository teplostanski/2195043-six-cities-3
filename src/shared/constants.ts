import type { FavoriteStatus } from './types';

export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const LOGIN_PASSWORD_PATTERN = '^(?=.*[A-Za-z])(?=.*\\d).+$';

export const AUTH_TOKEN_STORAGE_KEY = 'six-cities-token';

export const MIN_COMMENT_LENGTH = 50;

export const RatingOptionsMap = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
] as const;

export const RatingStars = {
  5: '100%',
  4: '80%',
  3: '60%',
  2: '40%',
  1: '20%',
} as const;

export const PlaceCardConfig = {
  Cities: {
    articleClass: 'cities__card',
    imageWrapperClass: 'cities__image-wrapper',
    cardInfoClass: '',
    cardImageWidth: '260',
    cardImageHeight: '200',
  },
  Favorites: {
    articleClass: 'favorites__card',
    imageWrapperClass: 'favorites__image-wrapper',
    cardInfoClass: '',
    cardImageWidth: '150',
    cardImageHeight: '110',
  },
  Near: {
    articleClass: 'near-places__card',
    imageWrapperClass: 'near-places__image-wrapper',
    cardInfoClass: '',
    cardImageWidth: '260',
    cardImageHeight: '200',
  },
} as const;

export const FavoriteButtonConfig = {
  PlaceCard: {
    buttonClass: 'place-card__bookmark-button',
    activeClass: 'place-card__bookmark-button--active',
    iconClass: 'place-card__bookmark-icon',
    iconWidth: 18,
    iconHeight: 19,
  },
  Offer: {
    buttonClass: 'offer__bookmark-button',
    activeClass: 'offer__bookmark-button--active',
    iconClass: 'offer__bookmark-icon',
    iconWidth: 31,
    iconHeight: 33,
  },
} as const;

export const PremiumMarkConfig = {
  PlaceCard: 'place-card__mark',
  Offer: 'offer__mark',
} as const;

export const AppRoutes = {
  NotFound: '/404',
  CatchAll: '*',
  Empty: '#',
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  OfferById: (id: string) => `/offer/${id}`,
} as const;

export const ApiPaths = {
  Offers: '/offers',
  Offer: (id: string) => `/offers/${id}`,
  Nearby: (id: string) => `/offers/${id}/nearby`,
  Comments: (id: string) => `/comments/${id}`,
  Favorite: '/favorite',
  SetFavoriteStatus: (id: string, status: FavoriteStatus) =>
    `/favorite/${id}/${status}`,
  Login: '/login',
  Logout: '/logout',
} as const;

export const AuthStatus = {
  Unknown: 'UNKNOWN',
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
} as const;

export const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export const OfferSortOptions = [
  { name: 'Popular', value: 'popular' },
  { name: 'Price: low to high', value: 'price-low-to-high' },
  { name: 'Price: high to low', value: 'price-high-to-low' },
  { name: 'Top rated first', value: 'top-rated-first' },
] as const;
