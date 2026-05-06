import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import OfferGallery from '../../components/offer-gallery';
import { OfferNearbyList } from '../../components/offer-nearby-list';
import { OfferNearbyMap } from '../../components/offer-nearby-map';
import { OfferReview } from '../../components/offer-review';
import PremiumMark from '../../components/premium-mark';
import { Spinner } from '../../components/spinner';
import { routes } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { getRatingStarsWidth } from '../../shared/utils';
import {
  fetchNearbyOfferAction,
  fetchOfferAction,
} from '../../store/async-actions';
import {
  selectIsNearbyLoading,
  selectIsOfferLoading,
  selectIsOfferNotFound,
  selectNearbyError,
  selectNearbyOffers,
  selectOffer,
  selectOfferError,
} from '../../store/reducers/offerSlice';
import styles from './offer.module.css';

const OfferPage = () => {
  const params = useParams();

  const offer = useAppSelector(selectOffer);
  const isOfferLoading = useAppSelector(selectIsOfferLoading);
  const isOfferNotFound = useAppSelector(selectIsOfferNotFound);
  const offerError = useAppSelector(selectOfferError);
  const nearby = useAppSelector(selectNearbyOffers);
  const isNearbyLoading = useAppSelector(selectIsNearbyLoading);
  const nearbyError = useAppSelector(selectNearbyError);
  const dispatch = useAppDispatch();

  const [activeNearbyOfferId, setActiveNearbyOfferId] = useState<string | null>(
    null,
  );

  const nearbyOffers = nearby?.slice(0, 3) ?? null;

  useEffect(() => {
    if (!params.id) {
      return;
    }
    dispatch(fetchOfferAction(params.id));
    dispatch(fetchNearbyOfferAction(params.id));
  }, [dispatch, params.id]);

  if (!isOfferLoading && isOfferNotFound) {
    return (
      <Navigate
        to={routes.notFound}
        replace
        state={{ message: offerError?.message }}
      />
    );
  }

  return (
    <div
      className={cn('page', {
        [styles.loadingContainer]: isOfferLoading,
      })}
    >
      {isOfferLoading && <Spinner />}
      {!isOfferLoading && offerError && <p>{offerError.message}</p>}
      {!isOfferLoading && !offerError && offer && (
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <OfferGallery imagesPath={offer.images} />
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <PremiumMark show={offer.isPremium} />
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                  <button
                    className="offer__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="offer__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span
                      style={{
                        width: getRatingStarsWidth(offer.rating),
                      }}
                    />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {offer.rating}
                  </span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
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
                          'offer__avatar-wrapper--pro': offer.host.isPro,
                        },
                      )}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
                {params.id && <OfferReview offerId={params.id} />}
              </div>
            </div>
            <OfferNearbyMap
              city={offer.city}
              nearby={nearbyOffers}
              isLoading={isNearbyLoading}
              error={nearbyError?.message}
              activeOfferId={activeNearbyOfferId}
            />
          </section>
          <OfferNearbyList
            nearby={nearbyOffers}
            isLoading={isNearbyLoading}
            error={nearbyError?.message}
            onActive={setActiveNearbyOfferId}
          />
        </main>
      )}
    </div>
  );
};

export { OfferPage };
