import { useDispatch } from 'react-redux';
import DeleteButton from '../../ui/DeleteButton';
import UpdateQuantity from '../../ui/UpdateQuantity';
import Button from '../../ui/form/Button';
import { decreaseQuantity, increaseQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartItem({ order }) {
  const { name, quantity, id, unitPrice, totalPrice } = order;
  const dispatch = useDispatch();
  return (
    <div className="flex w-full items-center justify-between py-4">
      <span>
        {quantity} X {name}
      </span>
      <div className="flex items-center gap-2">
        <strong>{formatCurrency(totalPrice)}</strong>
        <DeleteButton id={id} />
        <UpdateQuantity
          decreaseQuantity={() => dispatch(decreaseQuantity(id))}
          increaseQuantity={() => dispatch(increaseQuantity(id))}
          pizzaQuantity={quantity}
        />
      </div>
    </div>
  );
}

export default CartItem;
