type CityName =
  | 'Amsterdam'
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Hamburg'
  | 'Dusseldorf';

  type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type Offer = {
  id: string;
  previewImage: string;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  type: OfferType;
  isFavorite: boolean;
  isPremium: boolean;
  city: {
    name: CityName;
  };
};
