import { Link } from 'react-router-dom';
import { routesMap } from '../../shared/constants';
import styles from './not-found.module.css';

const NotFoundPage = () => (
  <div className="page page--gray">
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.message}>Error 404. Page Not Found.</p>
        <Link to={routesMap.root} className={styles.link}>
          Go Home
        </Link>
      </div>
    </main>
  </div>
);

export { NotFoundPage };
