import cn from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PlaceCardConfig, AppRoutes } from '../../shared/constants';
import type { OfferPreview } from '../../shared/types';
import { getRatingStarsWidth } from '../../shared/utils';
import { PremiumMark } from '../premium-mark/premium-mark';
import { FavoriteButton } from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: OfferPreview;
  variant: keyof typeof PlaceCardConfig;
  onActive?: (id: string | null) => void;
};

const PlaceCardComponent = ({ offer, variant, onActive }: PlaceCardProps) => {
  const {
    articleClass,
    imageWrapperClass,
    cardInfoClass,
    cardImageWidth,
    cardImageHeight,
  } = PlaceCardConfig[variant];

  return (
    <article
      className={cn('place-card', {
        [articleClass]: true,
      })}
      onMouseEnter={() => {
        onActive?.(offer.id);
      }}
      onMouseLeave={() => {
        onActive?.(null);
      }}
    >
      <PremiumMark show={offer.isPremium} variant={'PlaceCard'} />
      <div
        className={cn('place-card__image-wrapper', {
          [imageWrapperClass]: true,
        })}
      >
        <Link to={AppRoutes.OfferById(offer.id)}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={cardImageWidth}
            height={cardImageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={cn('place-card__info', {
          [cardInfoClass]: true,
        })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isFavorite={offer.isFavorite}
            activeOfferId={offer.id}
            variant={'PlaceCard'}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingStarsWidth(offer.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoutes.OfferById(offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

const PlaceCard = memo(PlaceCardComponent);

export { PlaceCard };
