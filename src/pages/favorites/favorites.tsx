import { Link } from 'react-router-dom';
import { FavoritesCardList } from '../../components/favorites-card-list';
import { routesMap } from '../../shared/constants';
import { useAppSelector } from '../../shared/hooks/redux';

const FavoritesPage = () => {
  const { offers } = useAppSelector((state) => state.offersReducer);

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesCardList offers={offers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={routesMap.root}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
};

export { FavoritesPage };
