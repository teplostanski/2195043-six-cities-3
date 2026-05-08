import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { Spinner } from '../spinner/spinner';
import { OfferReviewForm } from '../offer-review-form/offer-review-form';
import { OfferReviewList } from '../offer-review-list/offer-review-list';
import { fetchCommentsAction, sendCommentAction } from '../../store/async-actions';
import {
  selectComments,
  selectCommentsFetchError,
  selectCommentsIsLoading,
  selectCommentsIsSubmitting,
  selectCommentsSubmitError,
} from '../../store/reducers/commentsSlice';
import { selectIsAuthenticated } from '../../store/reducers/authSlice';
import { sortComments } from '../../store/utils';
import type { CommentData } from '../../shared/types';

type OfferReviewProps = {
  offerId: string;
};

const OfferReview = ({ offerId }: OfferReviewProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const comments = useAppSelector(selectComments);
  const isLoading = useAppSelector(selectCommentsIsLoading);
  const isSubmitting = useAppSelector(selectCommentsIsSubmitting);
  const fetchError = useAppSelector(selectCommentsFetchError);
  const submitError = useAppSelector(selectCommentsSubmitError);
  const dispatch = useAppDispatch();

  const sortedComments = useMemo(() => sortComments(comments).slice(0, 10), [comments]);

  const handleSubmit = useCallback(
    (commentData: CommentData) => {
      void dispatch(sendCommentAction({ ...commentData, id: offerId }))
        .unwrap()
        .then(() => {
          dispatch(fetchCommentsAction(offerId));
        });
    },
    [dispatch, offerId],
  );

  useEffect(() => {
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
