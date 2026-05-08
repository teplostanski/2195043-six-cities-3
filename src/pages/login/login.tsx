import { Link } from 'react-router-dom';
import { AuthGate } from '../../components/auth-gate/auth-gate';
import { Header } from '../../components/header/header';
import { routes } from '../../shared/constants';
import { useAppDispatch } from '../../shared/hooks/redux';
import { loginAction } from '../../store/async-actions';
import { LoginData } from '../../shared/types';
import { LoginForm } from '../../components/login-form/login-form';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (formData: LoginData) => {
    dispatch(loginAction(formData));
  };

  return (
    <AuthGate requireAuth={false} redirectTo={routes.root}>
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
    </AuthGate>
  );
};

export { LoginPage };
