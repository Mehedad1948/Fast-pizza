import { Outlet } from 'react-router-dom';
import Sidebar from './ui/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 1000,
//     },
//   },
// });

function PanelLayout() {
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      <div className="panel grid h-full grid-cols-[12rem,_1fr] sm:grid-cols-1 sm:grid-rows-[auto,_1fr]">
        <Sidebar />
        <Outlet />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </QueryClientProvider> */}
    </>
  );
}

export default PanelLayout;
