import type { Comment } from '../shared/types';
import { OfferReviewForm } from './offer-review-form';
import { OfferReviewList } from './offer-review-list';

type OfferReviewProps = {
  comments: Comment[];
};

const OfferReview = ({ comments }: OfferReviewProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot;{' '}
      <span className="reviews__amount">{comments.length}</span>
    </h2>

    {comments && comments.length > 0 && <OfferReviewList comments={comments} />}

    <OfferReviewForm />
  </section>
);

export { OfferReview };
