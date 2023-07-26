import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import appReducer from './features/app/appSlice';

const store = configureStore({
  reducer: {
    settings: appReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
