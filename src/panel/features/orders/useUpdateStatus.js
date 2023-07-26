import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatus as updateStatusApi } from '../../../services/apiPanel';
import { toast } from 'react-hot-toast';

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isLoading } = useMutation({
    mutationFn: ({id, status}) => updateStatusApi( {id,status}),
    onSuccess: ([data]) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`Pizza #${data.id} status changed to ${data.status} successfully`);
    },
  });

  return { updateStatus, isLoading };
}
