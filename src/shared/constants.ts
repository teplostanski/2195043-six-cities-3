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
} as const;

export const routesMap = {
  notFound: '*',
  empty: '#',
  root: '/',
  login: '/login',
  favorites: '/favorites',
  offer: '/offer/:id',
  getOfferUrl: (id: string) => `/offer/${id}` ,
} as const;
