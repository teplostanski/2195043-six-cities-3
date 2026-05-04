import cn from 'classnames';
import { useState } from 'react';
import type { OfferSortOption } from '../shared/types';

type SortDropdownProps<T> = {
  options: readonly T[];
  activeOption: T;
  onActiveOption: (option: T) => void;
};

const SortDropdown = ({
  options,
  activeOption,
  onActiveOption,
}: SortDropdownProps<OfferSortOption>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClick = (option: OfferSortOption) => {
    onActiveOption(option);
    handleToggle();
  };

  return (
    <>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {options.find((option) => option.value === activeOption.value)?.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn('places__options places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className={cn('places__option', {
              'places__option--active': activeOption.value === option.value,
            })}
            tabIndex={0}
            onClick={() => handleClick(option)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export { SortDropdown };
