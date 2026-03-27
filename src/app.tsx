import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { type Offer } from './shared/types';
import MainPage from './pages/main/main';
import FavoritesPage from './pages/favorites/favorites';
import LoginPage from './pages/login/login';
import OfferPage from './pages/offer/offer';
import NotFoundPage from './pages/not-found/not-found';
import Layout from './components/layout';
import ScrollToTop from './components/scroll-to-top';
import PrivateRoute from './components/private-route';

type AppProps = {
  offers: Offer[];
};

function App({ offers }: AppProps) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage offers={offers} />} />
          <Route
            path="favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="offer/:id" element={<OfferPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
