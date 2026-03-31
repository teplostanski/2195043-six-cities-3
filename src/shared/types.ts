type CityName =
  | 'Amsterdam'
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Hamburg'
  | 'Dusseldorf';

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
  rating: 1 | 2 | 3 | 4 | 5;
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
