import { authStatus, cities, offerSortOptions, ratingStars } from './constants';

export type AuthorizationStatus = (typeof authStatus)[keyof typeof authStatus];

export type Rating = keyof typeof ratingStars;

export type CityName = (typeof cities)[keyof typeof cities];

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type FavoriteStatus = 0 | 1

export type FavoriteChangeData = {
  id: string;
  status: FavoriteStatus;
}

export type OfferPreview = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: {
    name: CityName;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: Rating;
  previewImage: string;
};

export type OfferFull = OfferPreview & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};

export type Comment = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: Rating;
};

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type CommentData = {
  comment: string;
  rating: Rating;
};

export type CommentSendData = CommentData & {
  id: string;
};

export type OfferSortOption = (typeof offerSortOptions)[number];
export type OfferSortType = OfferSortOption['value'];
