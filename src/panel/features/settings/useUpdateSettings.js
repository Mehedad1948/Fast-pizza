import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateSettings as updateSettingsApi } from '../../../services/apiPanel';

export function useUpdateSettings(params) {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: (updateObj) => updateSettingsApi(updateObj),
    onSuccess: (data) => {
      toast.success('Settings changed successfully');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  return { updateSettings, isUpdating };
}
