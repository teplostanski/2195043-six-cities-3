import { type ChangeEvent, type FormEvent, Fragment, useState } from 'react';
import type { CommentData, Rating } from '../../shared/types';
import { Spinner } from '../spinner/spinner';

type FormData = {
  rating: Rating | null;
  comment: string;
};

type OfferReviewFormProps = {
  onSubmit: (commentData: CommentData) => void;
  isSubmitting?: boolean;
};

const ratingOptionsMap = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
] as const;

const MIN_COMMENT_LENGTH = 50;

const OfferReviewForm = ({
  onSubmit,
  isSubmitting = false,
}: OfferReviewFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    rating: null,
    comment: '',
  });

  const isSubmitDisabled =
    formData.comment.length < MIN_COMMENT_LENGTH || formData.rating === null;

  const handleRatingChange = (value: Rating) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, comment: event.target.value }));
  };

  const resetForm = () => {
    setFormData({
      rating: null,
      comment: '',
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { rating, comment } = formData;
    if (rating === null) {
      return;
    }

    onSubmit({ comment, rating });
    resetForm();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
    >
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
        value={formData.comment}
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
          disabled={isSubmitDisabled || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="visually-hidden">Sending review</span>
              <Spinner compact />
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
};

export { OfferReviewForm };
