import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';
import { Spinner } from './spinner';
import { OfferReviewForm } from './offer-review-form';
import { OfferReviewList } from './offer-review-list';
import { fetchCommentsAction } from '../store/async-actions';
import { sortComments } from '../store/utils';

type OfferReviewProps = {
  offerId: string;
};

const OfferReview = ({ offerId }: OfferReviewProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const { comments, isLoading, error } = useAppSelector(
    (state) => state.commentsReducer,
  );
  const dispatch = useAppDispatch();

  const sortedComments = sortComments(comments).slice(0, 10);

  useEffect(() => {
    if (!offerId) {
      return;
    }
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  return (
    <section className="offer__reviews reviews">
      {isLoading && <Spinner />}
      {!isLoading && error && <p>{error.message}</p>}
      {!isLoading && !error && comments.length > 0 && (
        <>
          <h2 className="reviews__title">
            Reviews &middot;{' '}
            <span className="reviews__amount">{comments.length}</span>
          </h2>
          <OfferReviewList comments={sortedComments} />
        </>
      )}
      {!isLoading && !error && isAuthenticated && <OfferReviewForm />}
    </section>
  );
};

export { OfferReview };
