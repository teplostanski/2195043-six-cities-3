import cn from 'classnames';
import { cities } from '../shared/constants';
import { CityName } from '../shared/types';

type CitiesTabProps = {
  currentCity: CityName;
  onCityChange: (city: CityName) => void;
};

const CitiesTabs = ({ currentCity, onCityChange }: CitiesTabProps) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={`${city}-city`}
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

export { CitiesTabs };
