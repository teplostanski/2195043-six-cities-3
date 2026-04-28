import { useState } from 'react';
import { CitiesCardList } from '../../components/cities-card-list';
import { CitiesTabs } from '../../components/cities-tabs';
import Map from '../../components/map';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import type { CityName } from '../../shared/types';
import { setCurrentCity } from '../../store/reducers/offersSlice';
import { selectOffersByCity } from '../../store/selectors/offerSelectors';

const MainPage = () => {
  const { offers, currentCity } = useAppSelector((state) => state.offersReducer);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const filteredOffers = selectOffersByCity(offers, currentCity);

  const handleCityChange = (city: CityName) => {
    dispatch(setCurrentCity(city));
  };

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
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {currentCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              {filteredOffers && filteredOffers.length > 0 && (
                <CitiesCardList
                  offers={filteredOffers}
                  onActiveCardChange={setActiveOfferId}
                />
              )}
            </section>
            <div className="cities__right-section">
              {filteredOffers && filteredOffers.length > 0 && (
                <Map
                  city={filteredOffers[0].city}
                  offers={filteredOffers}
                  activeOfferId={activeOfferId}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { MainPage };
