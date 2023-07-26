import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.orders.push(action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.orders.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.orders.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity < 1) {
        cartSlice.caseReducers.deleteOrder(state, action);
      }
    },
    deleteOrder(state, action) {
      state.orders = state.orders.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state, action) {
      state.orders = [];
    },
  },
});

export default cartSlice.reducer;

export const { addItem, clearCart, increaseQuantity, decreaseQuantity, deleteOrder } =
  cartSlice.actions;

export const getCart = (state) => state.cart.orders;

export const getCurrentQuantity = (id) => (state) =>
  state.cart.orders.find((item) => item.id === id)?.quantity ?? 0;

export const getTotalCartQuantity = (store) =>
  store.cart.orders.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.orders.reduce((sum, item) => sum + item.totalPrice, 0);
