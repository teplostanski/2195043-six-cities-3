import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

import { type Offer } from './shared/types';

export const offers: Offer[] = [
  {
    id: 'a7f3b2',
    imagePath: 'img/apartment-01.jpg',
    ratingCount: 4,
    price: 120,
    name: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    isFavorite: false,
    isPremium: true,
  },
  {
    id: 'k9m4x1',
    imagePath: 'img/room.jpg',
    ratingCount: 4,
    price: 80,
    name: 'Wood and stone place',
    type: 'Room',
    isFavorite: true,
    isPremium: false,
  },
  {
    id: 'p2q8z5',
    imagePath: 'img/apartment-02.jpg',
    ratingCount: 4,
    price: 132,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    isFavorite: false,
    isPremium: false,
  },
  {
    id: 'r6t0w3',
    imagePath: 'img/apartment-03.jpg',
    ratingCount: 5,
    price: 180,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    isFavorite: false,
    isPremium: true,
  },
  {
    id: 'v1y7n9',
    imagePath: 'img/room.jpg',
    ratingCount: 4,
    price: 80,
    name: 'Wood and stone place',
    type: 'Room',
    isFavorite: true,
    isPremium: false,
  },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>,
);
