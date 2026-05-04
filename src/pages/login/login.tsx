import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { authStatus, loginPasswordPattern, routes } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { loginAction } from '../../store/async-actions';
import { LoginData } from '../../shared/types';

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = { onSubmit: (formData: LoginData) => void };

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const isFormIncomplete = !formData.email || !formData.password;
  const isSubmitDisabled = isFormIncomplete;

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    onSubmit(formData);
    resetForm();
  };

  const handleFieldChange =
    (field: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleFieldChange('email')}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          pattern={loginPasswordPattern}
          value={formData.password}
          onChange={handleFieldChange('password')}
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={isSubmitDisabled}
      >
        Sign in
      </button>
    </form>
  );
};

const LoginPage = () => {
  const { authorizationStatus } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const handleSubmit = (formData: LoginData) => {
    dispatch(loginAction(formData));
  };

  if (authorizationStatus === authStatus.auth) {
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
