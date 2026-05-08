import { FavoritesCardList } from '../../components/favorites-card-list/favorites-card-list';
import { Header } from '../../components/header/header';
import { Spinner } from '../../components/spinner/spinner';
import { useAppSelector } from '../../shared/hooks/redux';
import {
  selectFavorites,
  selectFavoritesIsLoading,
  selectFavoritesFetchError,
} from '../../store/reducers/favorites-slice';
import { FavoritesEmptyPage } from './favorites-empty';
import { FavoritesFooter } from './favorites-footer';

const FavoritesPage = () => {
  const favorites = useAppSelector(selectFavorites);
  const isLoading = useAppSelector(selectFavoritesIsLoading);
  const fetchError = useAppSelector(selectFavoritesFetchError);

  const hasFavorites = favorites.length > 0;

  if (!isLoading && !fetchError && !hasFavorites) {
    return <FavoritesEmptyPage />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {isLoading && <Spinner />}
          {!isLoading && fetchError && <p>{fetchError.message}</p>}
          {!isLoading && !fetchError && (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesCardList favorites={favorites} />
            </section>
          )}
        </div>
      </main>
      <FavoritesFooter />
    </div>
  );
};

export { FavoritesPage };
