import { memo } from 'react';
import { ratingStars } from '../shared/constants';
import type { Comment } from '../shared/types';
import { formatDate } from '../shared/utils';

type OfferReviewListProps = {
  comments: Comment[];
};

const OfferReviewListComponent = ({ comments }: OfferReviewListProps) => (
  <ul className="reviews__list">
    {comments?.map((comment) => (
      <li key={comment.id} className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={comment.user.avatarUrl}
              width="54"
              height="54"
              alt="Reviews avatar"
            />
          </div>
          <span className="reviews__user-name">{comment.user.name}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{ width: ratingStars[comment.rating] }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">{comment.comment}</p>
          <time className="reviews__time" dateTime={comment.date}>
            {formatDate(comment.date)}
          </time>
        </div>
      </li>
    ))}
  </ul>
);

const OfferReviewList = memo(OfferReviewListComponent);

export { OfferReviewList };
