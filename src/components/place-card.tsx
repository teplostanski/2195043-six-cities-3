import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ratingStarMap } from '../shared/constants';
import { OfferPreview } from '../shared/types';
import PremiumMark from './premium-mark';

type Variant = 'cities' | 'favorites';

type PlaceCardProps = {
  offer: OfferPreview;
  variant: Variant;
  onActive: (id: string | null) => void;
};

const PlaceCard = ({ offer, variant, onActive }: PlaceCardProps) => {
  const isCitiesCard = variant === 'cities';
  const isFavoritesCard = variant === 'favorites';

  const cardImageSizesMap: Record<Variant, { width: string; height: string }> =
    {
      cities: { width: '260', height: '200' },
      favorites: { width: '150', height: '110' },
    } as const;

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
        <Link to={`/offer/${offer.id}`}>
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
          {/*
            ОСТАЛИСЬ ПУНКТЫ 9, 10, 11

            Используя компонент Link и хуки из пакета react-router-dom свяжите страницы приложения. Например, клик по заголовку карточки предложения должен переводить пользователя на страницу «Offer» с подробным описанием предложения по аренде.
          */}
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export { PlaceCard };
