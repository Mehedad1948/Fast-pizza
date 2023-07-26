import { useSearchParams } from 'react-router-dom';
import Filter from './Filter';
import SortBy from './SortBy';
import FilterButton from './FilterButton';
import { useState } from 'react';

function TableOperations() {
  const [serachParams, setSearchParams] = useSearchParams();
  const [priority, setPriority] = useState()

  function handleClick(value) {
    serachParams.set('priority', !priority);
    setSearchParams(serachParams);
    setPriority(serachParams.get('priority') === 'true')
  }
  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center gap-3">
        <Filter
          filterField="status"
          options={[
            { value: 'all', label: 'All' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'pending', label: 'Pending' },
            { value: 'unconfirmed', label: 'Unconfirmed' },
          ]}
        />
        <FilterButton
          onClick={() => handleClick()}
          active={priority}
        >
          Priority
        </FilterButton>
      </div>
      <SortBy
        options={[
          { value: 'created_at-desc', label: 'Sort by date (recent first)' },
          { value: 'created_at-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'totalQuantity-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'totalQuantity-asc', label: 'Sort by amount (low first)' },
        ]}
      />
    </div>
  );
}

export default TableOperations;
