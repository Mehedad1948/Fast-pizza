import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder as deleteOrderApi } from '../../../services/apiPanel';
import { toast } from 'react-hot-toast';

export function useDeleteOrder(params) {
    const queryClient = useQueryClient()

  const { mutate: deleteOrder, isLoading } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: (data) => {
      console.log('success', data);
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
      toast.success(`Order #${data.id} was successfully deleted`);
    },
  });

  return {deleteOrder, isLoading}
}
