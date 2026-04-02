import { useState, useCallback } from 'react';
import type { CityName, OfferPreview } from '../shared/types';
import { PlaceCard } from './place-card';

type FavoritesCardListProps = {
  offers: OfferPreview[];
};

type OffersByCity = {
  city: CityName;
  offers: OfferPreview[];
};

const FavoritesCardList = ({ offers }: FavoritesCardListProps) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleToggleActiveCard = useCallback((id: string | null) => {
    setActiveCardId(id);
  }, []);

  const favoriteOffers = offers.filter((item) => item.isFavorite === true);

  const groupedOffersByCity = favoriteOffers.reduce((acc, current) => {
    const cityName = current.city.name;
    const existingGroup = acc.find((group) => group.city === cityName);

    if (!existingGroup) {
      acc.push({ city: cityName, offers: [current] });
    } else {
      existingGroup.offers.push(current);
    }

    return acc;
  }, [] as OffersByCity[]);

  return (
    <ul className="favorites__list">
      {groupedOffersByCity.length > 0 &&
        groupedOffersByCity.map((group) => (
          <li key={group.city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{group.city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {group.offers.map((offer) => (
                <PlaceCard
                  key={offer.id}
                  offer={offer}
                  variant="favorites"
                  onActive={handleToggleActiveCard}
                />
              ))}
            </div>
          </li>
        ))}
    </ul>
  );
};

export { FavoritesCardList };
