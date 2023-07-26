import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../../services/apiPanel';

export function useSettings(params) {
  const { data: settings, isLoading } = useQuery({
    queryFn: getSettings,
    queryKey: ['settings'],
  });

  return { settings, isLoading };
}
