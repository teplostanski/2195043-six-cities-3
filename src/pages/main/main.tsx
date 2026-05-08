import { useCallback, useMemo, useState } from 'react';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { CitiesTabs } from '../../components/cities-tabs/cities-tabs';
import Map from '../../components/map/map';
import { SortSection } from '../../components/sort-section/sort-section';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import type { CityName, OfferSortType } from '../../shared/types';
import {
  selectCurrentCity,
  selectOffers,
  selectOffersListError,
  selectOffersListIsLoading,
  setCurrentCity,
} from '../../store/reducers/offersListSlice';
import { selectOffersByCity, sortOffers } from '../../store/utils';
import { offerSortOptions } from '../../shared/constants';
import { MainEmptyPage } from './main-empty';

const MainPage = () => {
  const rawOffers = useAppSelector(selectOffers);
  const currentCity = useAppSelector(selectCurrentCity);
  const isLoading = useAppSelector(selectOffersListIsLoading);
  const error = useAppSelector(selectOffersListError);
  const dispatch = useAppDispatch();

  const defaultSortType = offerSortOptions[0].value;
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sortType, setSortType] = useState<OfferSortType>(defaultSortType);

  const filteredOffers = useMemo(
    () => selectOffersByCity(rawOffers, currentCity),
    [rawOffers, currentCity],
  );

  const offers = useMemo(
    () => sortOffers(filteredOffers, sortType),
    [filteredOffers, sortType],
  );

  const hasOffers = offers.length > 0;

  const handleCityChange = useCallback(
    (city: CityName) => {
      dispatch(setCurrentCity(city));
    },
    [dispatch],
  );

  const handleActiveCardChange = useCallback((id: string | null) => {
    setActiveOfferId(id);
  }, []);

  if (!isLoading && !error && !hasOffers) {
    return (
      <MainEmptyPage
        currentCity={currentCity}
        onCityChange={handleCityChange}
      />
    );
  }

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesTabs
            currentCity={currentCity}
            onCityChange={handleCityChange}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {isLoading && <Spinner />}

            {!isLoading && error && <p>{error.message}</p>}

            {!isLoading && !error && (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {offers.length} places to stay in {currentCity}
                  </b>
                  <SortSection
                    activeSort={sortType}
                    onSortChange={setSortType}
                  />
                  <CitiesCardList
                    offers={offers}
                    onActiveCardChange={handleActiveCardChange}
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    city={offers[0].city}
                    offers={offers}
                    activeOfferId={activeOfferId}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export { MainPage };
