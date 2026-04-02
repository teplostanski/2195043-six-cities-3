import { useCallback, useState } from 'react';
import { OfferPreview } from '../shared/types';
import { PlaceCard } from './place-card';

type CitiesCardListProps = {
  offers: OfferPreview[];
};

const CitiesCardList = ({ offers }: CitiesCardListProps) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleToggleActiveCard = useCallback((id: string | null) => {
    setActiveCardId(id);
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <PlaceCard
          key={card.id}
          offer={card}
          onActive={handleToggleActiveCard}
          variant={'cities'}
        />
      ))}
    </div>
  );
}

export {CitiesCardList};
