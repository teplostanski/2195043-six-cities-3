import { OfferSortOptions } from '../../shared/constants';
import type { OfferSortOption, OfferSortType } from '../../shared/types';
import { SortDropdown } from '../sort-dropdown/sort-dropdown';

type SortSectionProps = {
  activeSort: OfferSortType;
  onSortChange: (sort: OfferSortType) => void;
};

const SortSection = ({ activeSort, onSortChange }: SortSectionProps) => {
  const activeOption =
    OfferSortOptions.find((option) => option.value === activeSort) ??
    OfferSortOptions[0];

  const handleChangeActiveOption = (option: OfferSortOption) => {
    onSortChange(option.value);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <SortDropdown
        options={OfferSortOptions}
        activeOption={activeOption}
        onActiveOption={handleChangeActiveOption}
      />
    </form>
  );
};

export { SortSection };
