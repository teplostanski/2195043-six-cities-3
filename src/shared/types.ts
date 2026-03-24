export type Offer = {
  id: string;
  imagePath: string;
  price: number;
  ratingCount: 1 | 2 | 3 | 4 | 5;
  name: string;
  type: string;
  isFavorite: boolean;
  isPremium: boolean;
};
