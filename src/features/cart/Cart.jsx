import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/form/Button';
import { clearCart } from './cartSlice';

function Cart() {
  const orders = useSelector((state) => state.cart.orders);
  const dispatch = useDispatch()


  return (
    <div className="flex w-full flex-col">
      <Link to="/menu">Back to menu</Link>
      <h2>Your cart, USER</h2>
      <div className="flex flex-col divide-y divide-slate-300">
        {orders.map((order) => (
          <CartItem order={order} key={order.pizzaId} />
        ))}
      </div>
      <div className="flex items-center gap-5 border-t pt-4">
        <Link to='/order' className="uppercase">Order Pizzas</Link>
        <Button
        onClick={() => dispatch(clearCart())}
          className="border-2 border-slate-300 !bg-slate-50 uppercase 
                   text-slate-400 hover:!bg-stone-200 hover:text-stone-800"
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
