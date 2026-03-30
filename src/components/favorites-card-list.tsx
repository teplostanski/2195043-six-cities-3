import { Offer } from '../shared/types';
import FavoritesCard from './favorites-card';

type FavoritesCardListProps = {
  offers: Offer[];
};

function FavoritesCardList({ offers }: FavoritesCardListProps) {
  const favoriteOffers = offers.filter((item) => item.isFavorite === true);
  return (
    <ul className="favorites__list">
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{favoriteOffers[0].city.name}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {favoriteOffers.map((card) => (
            <FavoritesCard
              key={card.id}
              previewImage={card.previewImage}
              rating={card.rating}
              price={card.price}
              title={card.title}
              type={card.type}
              isFavorite={card.isFavorite}
              isPremium={card.isPremium}
            />
          ))}
        </div>
      </li>
    </ul>
  );
}

export default FavoritesCardList;
