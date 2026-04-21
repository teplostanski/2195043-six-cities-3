import { useState, useCallback } from 'react';
import type { CityName, OfferPreview } from '../shared/types';
import { PlaceCard } from './place-card';
import { Link } from 'react-router-dom';
import { routesMap } from '../shared/constants';

type FavoritesCardListProps = {
  offers: OfferPreview[];
};

type OffersByCity = {
  city: CityName;
  offers: OfferPreview[];
};

const FavoritesCardList = ({ offers }: FavoritesCardListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleToggleActiveCard = useCallback((id: string | null) => {
    setActiveCardId(id);
  }, []);

  const favoriteOffers = offers.filter((item) => item.isFavorite);

  const groupedFavoritesByCity = favoriteOffers.reduce((acc, current) => {
    const cityName = current.city.name;
    const existingGroup = acc.find((group) => group.city === cityName);

    if (!existingGroup) {
      acc.push({ city: cityName, offers: [current] });
    } else {
      existingGroup.offers.push(current);
    }

    return acc;
  }, [] as OffersByCity[]);

  /**
   * groupedFavoritesByCity.length > 0 &&
   */

  return (
    <ul className="favorites__list">
      {groupedFavoritesByCity.map((group) => (
        <li key={group.city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link to={routesMap.empty} className="locations__item-link">
                <span>{group.city}</span>
              </Link>
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
