import { Link } from 'react-router-dom';
import { routes } from '../shared/constants';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux';
import { logoutAction } from '../store/async-actions';

const HeaderUserNav = () => {
  const { userInfo, isAuthenticated } = useAppSelector(
    (state) => state.authReducer,
  );

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    void dispatch(logoutAction());
  };

  const isGuest = !isAuthenticated;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isGuest && (
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={routes.login}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={routes.empty}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  {userInfo?.avatarUrl ? (
                    <img
                      className="user__avatar"
                      src={userInfo.avatarUrl}
                      width={20}
                      height={20}
                      alt=""
                    />
                  ) : null}
                </div>
                <span className="header__user-name user__name">
                  {userInfo?.email}
                </span>
                <span className="header__favorite-count">{}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={routes.root}>
                <span className="header__signout" onClick={handleLogout}>
                  Sign out
                </span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export { HeaderUserNav };
