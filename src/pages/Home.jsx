import { useSelector } from 'react-redux';
import Login from '../ui/Login';
import Button from '../ui/form/Button';
import { useNavigate } from 'react-router-dom';
// import { uploadMenu } from '../services/supRestaurant';
// import { useEffect, useRef } from 'react';

function Home({ className }) {
  // const isMountedRef = useRef(false);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userName = useSelector((state) => state.user.userName);
  // useEffect(() => {
  //   if (!isMountedRef.current) {
  //     uploadMenu();
  //     isMountedRef.current = true;
  //   }
  // }, []);
  return (
    <div className="flex grow flex-col pt-24  ">
      <div className="flex flex-col items-center gap-3 gap-y-6">
        <h1 className="text-4xl font-semibold">🍕The Best Pizza</h1>
        <h2 className="text-2xl font-semibold text-yellow-500">
          Straight from oven, to your door
        </h2>
        {!isAuthenticated ? (
          <Login />
        ) : (
          <>
            <h2 className="text-2xl font-semibold">
              👋 Hi {userName}, Let's get some pizzas
            </h2>
            <Button className="self-center" onClick={() => navigate('/menu')}>
              Go to Menu
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
