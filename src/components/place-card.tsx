import { Link } from 'react-router-dom';
import { ratingStarEnum } from '../shared/constants';
import { OfferPreview } from '../shared/types';
import PremiumMark from './premium-mark';

type PlaceCardProps = Pick<
  OfferPreview,
  | 'id'
  | 'previewImage'
  | 'price'
  | 'rating'
  | 'title'
  | 'type'
  | 'isFavorite'
  | 'isPremium'
> & {
  onHover: (id: string) => void;
  onLeave: () => void;
};

function PlaceCard({
  id,
  previewImage,
  price,
  rating,
  title,
  type,
  isFavorite,
  isPremium,
  onHover,
  onLeave,
}: PlaceCardProps) {
  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => {
        console.log('ENTER', id);
        onHover?.(id);
      }}
      onMouseLeave={() => {
        console.log('LEAVE', id);
        onLeave?.();
      }}
    >
      <PremiumMark show={isPremium} />
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={
              isFavorite
                ? 'place-card__bookmark-button place-card__bookmark-button--active button'
                : 'place-card__bookmark-button button'
            }
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
            <span style={{ width: ratingStarEnum[rating] }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          {/*
            ОСТАЛИСЬ ПУНКТЫ 9, 10, 11

            Используя компонент Link и хуки из пакета react-router-dom свяжите страницы приложения. Например, клик по заголовку карточки предложения должен переводить пользователя на страницу «Offer» с подробным описанием предложения по аренде.
          */}
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
