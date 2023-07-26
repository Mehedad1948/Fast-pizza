import { useDispatch } from 'react-redux';
import { deleteOrder } from '../features/cart/cartSlice';
import Button from './form/Button';

function DeleteButton({id}) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(deleteOrder(id))}
      className="mr-6 !py-2 text-sm"
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
