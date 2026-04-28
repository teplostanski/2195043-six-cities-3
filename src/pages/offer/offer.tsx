import cn from 'classnames';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import OffersMap from '../../components/map';
import OfferGallery from '../../components/offer-gallery';
import { OfferReview } from '../../components/offer-review';
import { PlaceCard } from '../../components/place-card';
import PremiumMark from '../../components/premium-mark';
import { commentsMock } from '../../mocks/comments';
import { offersFullMock } from '../../mocks/offers';
import { ratingStarMap } from '../../shared/constants';

const OfferPage = () => {
  const params = useParams();
  const offerInfo = offersFullMock.find((offer) => offer.id === params.id);
  const [activeNearbyOfferId, setActiveNearbyOfferId] = useState<string | null>(
    null,
  );

  const nearbyOffers = useMemo(
    () => offersFullMock.filter((offer) => offer.id !== params.id).slice(0, 3),
    [params.id],
  );

  if (!offerInfo) {
    return null;
  }

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery imagesPath={offerInfo.images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <PremiumMark show={offerInfo.isPremium} />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offerInfo.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: ratingStarMap[offerInfo.rating] }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offerInfo.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerInfo.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerInfo.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerInfo.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerInfo.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerInfo.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={cn(
                      'offer__avatar-wrapper',
                      'user__avatar-wrapper',
                      {
                        'offer__avatar-wrapper--pro': offerInfo.host.isPro,
                      },
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offerInfo.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offerInfo.host.name}
                  </span>
                  {offerInfo.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerInfo.description}</p>
                </div>
              </div>
              {commentsMock && commentsMock.length > 0 && (
                <OfferReview comments={commentsMock} />
              )}
            </div>
          </div>
          {nearbyOffers.length > 1 && (
            <OffersMap
              className="offer__map map"
              city={offerInfo.city}
              offers={nearbyOffers}
              activeOfferId={activeNearbyOfferId}
            />
          )}
        </section>
        {nearbyOffers.length > 1 && (
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearbyOffers.map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                    variant="near"
                    onActive={setActiveNearbyOfferId}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export { OfferPage };
