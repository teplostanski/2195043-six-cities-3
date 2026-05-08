import { Link } from 'react-router-dom';
import { routes } from '../../shared/constants';

const FavoritesFooter = () => (
  <footer className="footer container">
    <Link className="footer__logo-link" to={routes.root}>
      <img
        className="footer__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width="64"
        height="33"
      />
    </Link>
  </footer>
);

export { FavoritesFooter };
