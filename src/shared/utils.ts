import { ratingStars } from './constants';
import type { Rating } from './types';

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const getRatingStarsWidth = (rating: Rating) =>
  ratingStars[Math.floor(rating) as Rating];
