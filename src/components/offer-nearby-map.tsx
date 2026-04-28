import Map from './map';
import { Spinner } from './spinner';
import type { OfferFull } from '../shared/types';

type OfferNearbyMapProps = {
  city: OfferFull['city'];
  nearby: OfferFull[] | null;
  isLoading: boolean;
  error: string | null;
  activeOfferId: string | null;
};

const OfferNearbyMap = ({
  city,
  nearby,
  isLoading,
  error,
  activeOfferId,
}: OfferNearbyMapProps) => {
  if (isLoading) {
    return (
      <div className="offer__map map">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!nearby || nearby.length <= 1) {
    return null;
  }

  return (
    <Map
      className="offer__map map"
      city={city}
      offers={nearby}
      activeOfferId={activeOfferId}
    />
  );
};

export { OfferNearbyMap };
