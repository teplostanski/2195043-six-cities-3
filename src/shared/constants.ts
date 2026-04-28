export const ratingStarMap = {
  5: '100%',
  4: '80%',
  3: '60%',
  2: '40%',
  1: '20%',
} as const;

export const cardImageSizesMap = {
  cities: { width: '260', height: '200' },
  favorites: { width: '150', height: '110' },
  near: { width: '260', height: '200' },
} as const;

export const routesMap = {
  notFound: '*',
  empty: '#',
  root: '/',
  login: '/login',
  favorites: '/favorites',
  offer: '/offer/:id',
  offerById: (id: string) => `/offer/${id}`,
} as const;

export const apiPathsMap = {
  offers: '/offers',
  offer: (id: string) => `/offers/${id}`,
  nearby: (id: string) => `/offers/${id}/nearby`,
  comments: (id: string) => `/comments/${id}`,
  favorite: '/favorite',
  setFavoriteStatus: (id: string, status: 0 | 1) => `/favorite/${id}/${status}`,
  login: '/login',
  logout: '/logout',
} as const;

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;
