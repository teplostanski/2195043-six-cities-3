import { PlaceCard } from '../place-card/place-card';
import { Spinner } from '../spinner/spinner';
import type { OfferFull } from '../../shared/types';

type OfferNearbyListProps = {
  nearby: OfferFull[];
  isLoading: boolean;
  error?: string;
};

const OfferNearbyList = ({
  nearby,
  isLoading,
  error,
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
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export { OfferNearbyList };
