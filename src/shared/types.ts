import { cities } from './constants';

export type Rating = 1 | 2 | 3 | 4 | 5;

export type CityName = typeof cities[number];

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

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
};

export type LoginData = {
  email: string;
  password: string;
};
