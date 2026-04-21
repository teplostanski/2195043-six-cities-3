import { Link } from 'react-router-dom';
import cn from 'classnames';
import { cardImageSizesMap, ratingStarMap, routesMap } from '../shared/constants';
import { OfferPreview } from '../shared/types';
import PremiumMark from './premium-mark';

type Variant = keyof typeof cardImageSizesMap;

type PlaceCardProps = {
  offer: OfferPreview;
  variant: Variant;
  onActive: (id: string | null) => void;
};

const PlaceCard = ({ offer, variant, onActive }: PlaceCardProps) => {
  const isCitiesCard = variant === 'cities';
  const isFavoritesCard = variant === 'favorites';

  return (
    <article
      className={cn('place-card', {
        ['cities__card']: isCitiesCard,
        ['favorites__card']: isFavoritesCard,
      })}
      onMouseEnter={() => {
        onActive?.(offer.id);
      }}
      onMouseLeave={() => {
        onActive?.(null);
      }}
    >
      <PremiumMark show={offer.isPremium} />
      <div
        className={cn('place-card__image-wrapper', {
          'cities__image-wrapper': isCitiesCard,
          'favorites__image-wrapper': isFavoritesCard,
        })}
      >
        <Link to={routesMap.getOfferUrl(offer.id)}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={cardImageSizesMap[variant]?.width}
            height={cardImageSizesMap[variant]?.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={cn('place-card__info', {
          'favorites__card-info': isFavoritesCard,
        })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn('button', 'place-card__bookmark-button', {
              'place-card__bookmark-button--active': offer.isFavorite,
            })}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingStarMap[offer.rating] }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={routesMap.getOfferUrl(offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export { PlaceCard };
