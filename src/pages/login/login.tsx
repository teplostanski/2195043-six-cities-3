import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { routes } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { loginAction } from '../../store/async-actions';
import { LoginData } from '../../shared/types';
import { LoginForm } from '../../components/login-form';
import { selectIsAuthenticated } from '../../store/reducers/authSlice';

const LoginPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const handleSubmit = (formData: LoginData) => {
    dispatch(loginAction(formData));
  };

  if (isAuthenticated) {
    return <Navigate to={routes.root} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm onSubmit={handleSubmit} />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={routes.empty}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export { LoginPage };
