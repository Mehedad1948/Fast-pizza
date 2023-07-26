import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return <div>{isAuthenticated ? children : <Home />}</div>;
}

export default ProtectedRoute;
