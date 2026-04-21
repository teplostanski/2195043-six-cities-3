import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import { routesMap } from '../../shared/constants';

function NotFoundPage() {
  return (
    <div className="page page--gray">
      <main className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.message}>
            Error 404. Page Not Found.
          </p>
          <Link to={routesMap.root} className={styles.link}>
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
