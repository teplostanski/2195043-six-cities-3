import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../shared/constants';
import { HeaderUserNav } from '../header-user-nav/header-user-nav';

const Header = () => {
  const { pathname } = useLocation();

  const isMainPage = pathname === routes.root;
  const isLoginPage = pathname === routes.login;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={routes.root}
              className={cn('header__logo-link', {
                'header__logo-link--active': isMainPage,
              })}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {!isLoginPage && <HeaderUserNav />}
        </div>
      </div>
    </header>
  );
};

export { Header };
