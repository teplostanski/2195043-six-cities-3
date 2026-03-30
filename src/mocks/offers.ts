import { type Offer } from '../shared/types';

export const offers: Offer[] = [
  {
    id: 'a7f3b2',
    previewImage: 'img/apartment-01.jpg',
    rating: 4,
    price: 120,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    isFavorite: false,
    isPremium: true,
    city: {
      name: 'Amsterdam',
    },
  },
  {
    id: 'k9m4x1',
    previewImage: 'img/room.jpg',
    rating: 4,
    price: 80,
    title: 'Wood and stone place',
    type: 'room',
    isFavorite: true,
    isPremium: false,
    city: {
      name: 'Amsterdam',
    },
  },
  {
    id: 'p2q8z5',
    previewImage: 'img/apartment-02.jpg',
    rating: 4,
    price: 132,
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    isFavorite: true,
    isPremium: false,
    city: {
      name: 'Amsterdam',
    },
  },
  {
    id: 'r6t0w3',
    previewImage: 'img/apartment-03.jpg',
    rating: 5,
    price: 180,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    isFavorite: false,
    isPremium: true,
    city: {
      name: 'Amsterdam',
    },
  },
];
