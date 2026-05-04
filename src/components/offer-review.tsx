import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';
import { Spinner } from './spinner';
import { OfferReviewForm } from './offer-review-form';
import { OfferReviewList } from './offer-review-list';
import { fetchCommentsAction, sendCommentAction } from '../store/async-actions';
import { sortComments } from '../store/utils';
import type { CommentData } from '../shared/types';

type OfferReviewProps = {
  offerId: string;
};

const OfferReview = ({ offerId }: OfferReviewProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const { comments, isLoading, isSubmitting, fetchError, submitError } =
    useAppSelector((state) => state.commentsReducer);
  const dispatch = useAppDispatch();

  const sortedComments = sortComments(comments).slice(0, 10);

  const handleSubmit = (commentData: CommentData) => {
    void dispatch(sendCommentAction({ ...commentData, id: offerId }))
      .unwrap()
      .then(() => {
        dispatch(fetchCommentsAction(offerId));
      });
  };

  useEffect(() => {
    if (!offerId) {
      return;
    }
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  return (
    <section className="offer__reviews reviews">
      {isLoading && <Spinner />}
      {!isLoading && fetchError && <p>{fetchError.message}</p>}
      {!isLoading && !fetchError && comments.length > 0 && (
        <>
          <h2 className="reviews__title">
            Reviews &middot;{' '}
            <span className="reviews__amount">{comments.length}</span>
          </h2>
          <OfferReviewList comments={sortedComments} />
        </>
      )}
      {!isLoading && !fetchError && isAuthenticated && (
        <>
          {submitError && <p>{submitError.message}</p>}
          <OfferReviewForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </section>
  );
};

export { OfferReview };
