import { memo } from 'react';
import type { OfferPreview } from '../../shared/types';
import { PlaceCard } from '../place-card/place-card';

type CitiesCardListProps = {
  offers: OfferPreview[];
  onActiveCardChange: (id: string | null) => void;
};

const CitiesCardListComponent = ({
  offers,
  onActiveCardChange,
}: CitiesCardListProps) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((card) => (
      <PlaceCard
        key={card.id}
        offer={card}
        onActive={onActiveCardChange}
        variant={'Cities'}
      />
    ))}
  </div>
);

const CitiesCardList = memo(CitiesCardListComponent);

export { CitiesCardList };
