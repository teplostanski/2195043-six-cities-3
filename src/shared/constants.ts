import { FavoriteStatus } from './types';

export const ratingStars = {
  5: '100%',
  4: '80%',
  3: '60%',
  2: '40%',
  1: '20%',
} as const;

export const placeCardConfig = {
  cities: {
    articleClass: 'cities__card',
    imageWrapperClass: 'cities__image-wrapper',
    cardInfoClass: '',
    cardImageWidth: '260',
    cardImageHeight: '200',
  },
  favorites: {
    articleClass: 'favorites__card',
    imageWrapperClass: 'favorites__image-wrapper',
    cardInfoClass: '',
    cardImageWidth: '150',
    cardImageHeight: '110',
  },
  near: {
    articleClass: 'near-places__card',
    imageWrapperClass: 'near-places__image-wrapper',
    cardInfoClass: '',
    cardImageWidth: '260',
    cardImageHeight: '200',
  },
} as const;

export const favoriteButtonConfig = {
  placeCard: {
    buttonClass: 'place-card__bookmark-button',
    activeClass: 'place-card__bookmark-button--active',
    iconClass: 'place-card__bookmark-icon',
    iconWidth: 18,
    iconHeight: 19,
  },
  offer: {
    buttonClass: 'offer__bookmark-button',
    activeClass: 'offer__bookmark-button--active',
    iconClass: 'offer__bookmark-icon',
    iconWidth: 31,
    iconHeight: 33,
  },
} as const;

export const routes = {
  notFound: '/404',
  catchAll: '*',
  empty: '#',
  root: '/',
  login: '/login',
  favorites: '/favorites',
  offer: '/offer/:id',
  offerById: (id: string) => `/offer/${id}`,
} as const;

export const apiPaths = {
  offers: '/offers',
  offer: (id: string) => `/offers/${id}`,
  nearby: (id: string) => `/offers/${id}/nearby`,
  comments: (id: string) => `/comments/${id}`,
  favorite: '/favorite',
  setFavoriteStatus: (id: string, status: FavoriteStatus) =>
    `/favorite/${id}/${status}`,
  login: '/login',
  logout: '/logout',
} as const;

export const authStatus = {
  unknown: 'UNKNOWN',
  auth: 'AUTH',
  noAuth: 'NO_AUTH',
} as const;

export const cities = {
  paris: 'Paris',
  cologne: 'Cologne',
  brussels: 'Brussels',
  amsterdam: 'Amsterdam',
  hamburg: 'Hamburg',
  dusseldorf: 'Dusseldorf',
} as const;

export const loginPasswordPattern = '^(?=.*[A-Za-z])(?=.*\\d).+$' as const;

export const AUTH_TOKEN_STORAGE_KEY = 'six-cities-token';

export const offerSortOptions = [
  { name: 'Popular', value: 'popular' },
  { name: 'Price: low to high', value: 'price-low-to-high' },
  { name: 'Price: high to low', value: 'price-high-to-low' },
  { name: 'Top rated first', value: 'top-rated-first' },
] as const;
