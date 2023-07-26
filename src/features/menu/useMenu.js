import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMenu } from '../../services/supRestaurant';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useMenu(params) {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));


    const{data: {data: menu, count} = {}, isLoading} = useQuery({
        queryFn: ()=> getMenu(currentPage),
        queryKey: ['menu', currentPage],
        retry: false
    })

    const pageCount = Math.ceil(count / PAGE_SIZE)
    
    if (currentPage < pageCount) {
        queryClient.prefetchQuery({
           queryFn: ()=> getMenu(currentPage + 1),
           queryKey: ['menu', currentPage + 1]
       })
    //    console.log('next');
    }
    if (currentPage > 1 ) {
        queryClient.prefetchQuery({
           queryFn: ()=> getMenu(currentPage - 1),
           queryKey: ['menu', currentPage - 1]
       })
    //    console.log('before'); 
    }
 
    return {menu, count, isLoading}
}