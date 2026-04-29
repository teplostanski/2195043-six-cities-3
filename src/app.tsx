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
import { routesMap } from './shared/constants';
import { useAppDispatch } from './shared/hooks/redux';
import { checkAuthAction, fetchOffersListAction } from './store/async-actions';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersListAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={routesMap.notFound} element={<NotFoundPage />} />
        <Route path={routesMap.login} element={<LoginPage />} />
        <Route path={routesMap.root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path={routesMap.favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={routesMap.offer} element={<OfferPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { App };
