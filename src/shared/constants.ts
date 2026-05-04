export const ratingStars = {
  5: '100%',
  4: '80%',
  3: '60%',
  2: '40%',
  1: '20%',
} as const;

export const cardImageSizes = {
  cities: { width: '260', height: '200' },
  favorites: { width: '150', height: '110' },
  near: { width: '260', height: '200' },
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
  setFavoriteStatus: (id: string, status: 0 | 1) => `/favorite/${id}/${status}`,
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

export const loginPasswordPattern =
  '^(?=.*[A-Za-z])(?=.*\\d).+$' as const;

export const AUTH_TOKEN_STORAGE_KEY = 'six-cities-token';
