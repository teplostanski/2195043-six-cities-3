import { Link } from 'react-router-dom';
import { routes } from '../../shared/constants';
import styles from './not-found.module.css';

const NotFoundPage = ({ message }: { message?: string }) => (
  <div className="page page--gray">
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.message}>
          {message ? message : 'Error 404. Page Not Found.'}
        </p>
        <Link to={routes.root} className={styles.link}>
          Go Home
        </Link>
      </div>
    </main>
  </div>
);

export { NotFoundPage };
