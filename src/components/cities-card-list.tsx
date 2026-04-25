import { OfferPreview } from '../shared/types';
import { PlaceCard } from './place-card';

type CitiesCardListProps = {
  offers: OfferPreview[];
  onActiveCardChange: (id: string | null) => void;
};

const CitiesCardList = ({ offers, onActiveCardChange }: CitiesCardListProps) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <PlaceCard
          key={card.id}
          offer={card}
          onActive={onActiveCardChange}
          variant={'cities'}
        />
      ))}
    </div>
  );
};

export { CitiesCardList };
