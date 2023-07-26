import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Menu, { loader as menuLoader } from './pages/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as orderAction,
} from './features/order/CreateOrder';
import Order, {
  loader as orderLoader,
  action as updateOrderAction,
} from './features/order/Order';

import PanelLayout from './panel/PanelLayout';
import Customers from './panel/Customers';
import ManageOrders from './panel/features/orders/ManageOrders';
import PanelSettings from './panel/pages/PanelSettings';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from './features/app/appSlice';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'menu',
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: 'cart',
        element: <Cart />,
        loader: menuLoader,
      },
      {
        path: '/order',
        element: <CreateOrder />,
        action: orderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
      },
    ],
  },
  {
    path: '/panel',
    element: <PanelLayout />,
    children: [
      {
        index: true,
        element: <Customers />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'orders',
        element: <ManageOrders />,
      },
      {
        path: 'settings',
        element: <PanelSettings />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  console.log(settings);
  useEffect(() => {
    dispatch(fetchSettings());
  }, []);
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options

            // Default options for specific types
            success: {
              duration: 3000,
              className: 'bg-yellow-100 font-semibold tracing-6',
            },
            error: {
              duration: 500,
              className: 'bg-rose-100',
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
