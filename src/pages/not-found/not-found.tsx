import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../shared/constants';
import styles from './not-found.module.css';

const NotFoundPage = () => {
  const message = (
    useLocation().state as { message?: string } | null | undefined
  )?.message;

  return (
    <div className="page page--gray">
      <main className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.message}>
            {message ?? 'Error 404. Page Not Found.'}
          </p>
          <Link to={routes.root} className={styles.link}>
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export { NotFoundPage };
