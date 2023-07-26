import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../../services/apiPanel';
import { useSearchParams } from 'react-router-dom';

export function useOrders() {
  const [searchParams] = useSearchParams();

  //    Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { feild: 'status', value: filterValue };

      //  Filter Priority
      const filterPriority = searchParams.get('priority') === 'true';

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'created_at-desc';
  const [feild, direction] = sortByRaw.split('-');

  const sortBy = { feild, direction };

  const { data: { data: orders, count } = {}, isLoading } = useQuery({
    queryFn: () => getOrders(filter, filterPriority, sortBy),
    queryKey: ['orders', filterValue, sortBy, filterPriority],
  });

  return { orders, isLoading, count };
}
