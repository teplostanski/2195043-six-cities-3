import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import { PrivateRoute } from './components/private-route';
import { ScrollToTop } from './components/scroll-to-top';
import { FavoritesPage } from './pages/favorites/favorites';
import { LoginPage } from './pages/login/login';
import { MainPage } from './pages/main/main';
import { NotFoundPage } from './pages/not-found/not-found';
import { OfferPage } from './pages/offer/offer';
import { routes } from './shared/constants';
import { useAppDispatch, useAppSelector } from './shared/hooks/redux';
import {
  checkAuthAction,
  fetchFavoritesAction,
  fetchOffersListAction,
} from './store/async-actions';
import { selectIsAuthenticated } from './store/reducers/authSlice';

const App = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersListAction());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.notFound} element={<NotFoundPage />} />
        <Route path={routes.root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path={routes.favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={routes.offer} element={<OfferPage />} />
        </Route>
        <Route path={routes.catchAll} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
