import { Link } from 'react-router-dom';
import { routes } from '../shared/constants';
import type { CityName, OfferPreview } from '../shared/types';
import { PlaceCard } from './place-card';

type FavoritesCardListProps = {
  favorites: OfferPreview[];
};

type OffersByCity = {
  city: CityName;
  offers: OfferPreview[];
};

const FavoritesCardList = ({ favorites }: FavoritesCardListProps) => {
  const groupedFavoritesByCity = favorites.reduce((acc, current) => {
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
      {groupedFavoritesByCity.map((group) => (
        <li key={group.city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link to={routes.empty} className="locations__item-link">
                <span>{group.city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {group.offers.map((offer) => (
              <PlaceCard key={offer.id} offer={offer} variant="favorites" />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export { FavoritesCardList };
