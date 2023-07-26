import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import Loading from './Loading';
import FooterReceipt from './FooterReceipt';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="flex h-full flex-col">
      {isLoading && <Loading />}

      <Navbar />
      <main className="mx-auto w-full max-w-3xl">
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </main>
      <FooterReceipt />
    </div>
  );
}

export default AppLayout;
