import cn from 'classnames';
import { memo } from 'react';
import { cities } from '../shared/constants';
import { CityName } from '../shared/types';

type CitiesTabProps = {
  currentCity: CityName;
  onCityChange: (city: CityName) => void;
};

const CitiesTabsComponent = ({ currentCity, onCityChange }: CitiesTabProps) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {Object.values(cities).map((city) => (
        <li
          key={city}
          className="locations__item"
          onClick={() => onCityChange(city)}
        >
          <a
            href="#"
            className={cn('locations__item-link', 'tabs__item', {
              'tabs__item--active': currentCity === city,
            })}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>
);

const CitiesTabs = memo(CitiesTabsComponent);

export { CitiesTabs };
