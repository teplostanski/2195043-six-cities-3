import { type ChangeEvent, Fragment, useState } from 'react';
import type { Rating } from '../shared/types';

type FormData = {
  rating: Rating | null;
  text: string;
};

const ratingOptionsMap = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
] as const;

const MIN_COMMENT_LENGTH = 50;

const OfferReviewForm = () => {
  const [formData, setFormData] = useState<FormData>({
    rating: null,
    text: '',
  });

  const handleRatingChange = (value: Rating) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, text: event.target.value }));
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {ratingOptionsMap.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              onChange={() => handleRatingChange(value)}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.text}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.text.length < MIN_COMMENT_LENGTH}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export { OfferReviewForm };
