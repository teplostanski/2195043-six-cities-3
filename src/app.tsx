import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/main';
import { FavoritesPage } from './pages/favorites/favorites';
import { LoginPage } from './pages/login/login';
import { OfferPage } from './pages/offer/offer';
import { NotFoundPage } from './pages/not-found/not-found';
import { Layout } from './components/layout';
import { ScrollToTop } from './components/scroll-to-top';
import PrivateRoute from './components/private-route';
import { routesMap } from './shared/constants';
import { offerSlice } from './store/reducers/offerSlice';
import { useAppDispatch } from './shared/hooks/redux';
import { useEffect } from 'react';
import { offersMock } from './mocks/offers';

const App = () => {
  const { setOffers } = offerSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOffers(offersMock));
  }, [dispatch, setOffers]);

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
