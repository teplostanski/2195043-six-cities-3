import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CitiesCardList } from '../../components/cities-card-list';
import Map from '../../components/map';
import { routesMap } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { offerSlice } from '../../store/reducers/offerSlice';
import { selectOffersByCity } from '../../store/selectors/offerSelectors';



const MainPage = () => {
  const { offers } = useAppSelector((state) => state.offerReducer);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  //const { setCurrentCity } = offerSlice.actions;
  //const dispatch = useAppDispatch();

  //useEffect(() => {
  //  if (!activeCity) {
  //    return;
  //  }
  //  dispatch(setCurrentCity(activeCity));
  //}, [dispatch, activeCity, setCurrentCity]);
  
  const filteredOffers = selectOffersByCity(offers, 'Amsterdam');

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <Link
                  className="locations__item-link tabs__item"
                  to={routesMap.empty}
                >
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className="locations__item-link tabs__item"
                  to={routesMap.empty}
                >
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className="locations__item-link tabs__item"
                  to={routesMap.empty}
                >
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className="locations__item-link tabs__item tabs__item--active"
                  to={routesMap.empty}
                >
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className="locations__item-link tabs__item"
                  to={routesMap.empty}
                >
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link
                  className="locations__item-link tabs__item"
                  to={routesMap.empty}
                >
                  <span>Dusseldorf</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Amsterdam
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
              {offers && offers.length > 0 && (
                <CitiesCardList
                  offers={offers}
                  onActiveCardChange={setActiveOfferId}
                />
              )}
            </section>
            <div className="cities__right-section">
              {offers && offers.length > 0 && (
                <Map
                  city={offers[0].city}
                  offers={offers}
                  activeOfferId={activeOfferId}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainPage};
