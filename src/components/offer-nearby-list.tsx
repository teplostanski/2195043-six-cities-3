import { PlaceCard } from './place-card';
import { Spinner } from './spinner';
import type { OfferFull } from '../shared/types';

type OfferNearbyListProps = {
  nearby: OfferFull[] | null;
  isLoading: boolean;
  error?: string;
  onActive: (offerId: string | null) => void;
};

const OfferNearbyList = ({
  nearby,
  isLoading,
  error,
  onActive,
}: OfferNearbyListProps) => {
  if (isLoading) {
    return (
      <div className="container">
        <section className="near-places places">
          <Spinner />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <section className="near-places places">
          <p>{error}</p>
        </section>
      </div>
    );
  }

  if (!nearby || nearby.length <= 1) {
    return null;
  }

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearby.map((nearbyOffer) => (
            <PlaceCard
              key={nearbyOffer.id}
              offer={nearbyOffer}
              variant="near"
              onActive={onActive}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export { OfferNearbyList };
