import { useSearchParams } from 'react-router-dom';
import FilterButton from './FilterButton';

function Filter({ filterField, options }) {
    const [serachParams, setSearchParams] = useSearchParams();
    const currentFilter = serachParams.get(filterField) || options.at(0).value;
  
    function handleClick(value) {
      serachParams.set(filterField, value);
      if (serachParams.get('page')) serachParams.set('page', 1);
      setSearchParams(serachParams);
    }
  
    return (
      <div className='flex items-center gap-3'>
        {options.map((option) => (
          <FilterButton
            key={option.value}
            onClick={() => handleClick(option.value)}
            active={option.value === currentFilter}
            disabled={option.value === currentFilter}
          >
            {option.label}{' '}
          </FilterButton>
        ))}
      </div>
    );
  }
  
  export default Filter;