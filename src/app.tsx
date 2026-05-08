import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/private-route/private-route';
import { ScrollToTop } from './components/scroll-to-top/scroll-to-top';
import { FavoritesPage } from './pages/favorites/favorites';
import { LoginPage } from './pages/login/login';
import { MainPage } from './pages/main/main';
import { NotFoundPage } from './pages/not-found/not-found';
import { OfferPage } from './pages/offer/offer';
import { AppRoutes } from './shared/constants';
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
        <Route path={AppRoutes.Root} element={<MainPage />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
        <Route path={AppRoutes.CatchAll} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
