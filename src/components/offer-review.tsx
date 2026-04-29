import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';
import { Spinner } from './spinner';
import { OfferReviewForm } from './offer-review-form';
import { OfferReviewList } from './offer-review-list';
import { fetchCommentsAction } from '../store/async-actions';

type OfferReviewProps = {
  offerId: string;
};

const OfferReview = ({ offerId }: OfferReviewProps) => {
  const { comments, isLoading, error } = useAppSelector((state) => state.commentsReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!offerId) {
      return;
    }
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  return (
    <section className="offer__reviews reviews">
      {isLoading && <Spinner />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && comments.length > 0 && (
        <>
          <h2 className="reviews__title">
            Reviews &middot;{' '}
            <span className="reviews__amount">{comments.length}</span>
          </h2>
          <OfferReviewList comments={comments} />
        </>
      )}
      {!isLoading && !error && <OfferReviewForm />}
    </section>
  );
};

export { OfferReview };
