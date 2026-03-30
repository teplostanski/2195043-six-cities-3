import { useCallback, useState } from 'react';
import { Offer } from '../shared/types';
import PlaceCard from './place-card';

type PlaceCardListProps = {
  offers: Omit<Offer, 'city'>[];
};

function PlaceCardList({ offers }: PlaceCardListProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardHover = useCallback((id: string) => {
    setActiveCardId(id);
  }, []);

  const handleCardLeave = useCallback(() => {
    setActiveCardId(null);
  }, []);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <PlaceCard
          key={card.id}
          id={card.id}
          previewImage={card.previewImage}
          rating={card.rating}
          price={card.price}
          title={card.title}
          type={card.type}
          isFavorite={card.isFavorite}
          isPremium={card.isPremium}
          onHover={handleCardHover}
          onLeave={handleCardLeave}
        />
      ))}
    </div>
  );
}

export default PlaceCardList;
