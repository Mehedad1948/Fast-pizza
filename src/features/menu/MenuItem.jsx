import { useDispatch } from 'react-redux';
import Button from '../../ui/form/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
} from '../cart/cartSlice';
import UpdateQuantity from '../../ui/UpdateQuantity';
import DeleteButton from '../../ui/DeleteButton';
import { memo } from 'react';

const MenuItem = memo(function ({ pizza, isSelected, orders }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const pizzaQuantity = orders.find((order) => {
    return order.pizzaId === id;
  })?.quantity;
  
  const dispatch = useDispatch();

  const newIngredients = ingredients.join(', ');

  const newItem = {
    pizzaId: id,
    name,
    unitPrice,
    quantity: 1,
    totalPrice: unitPrice * 1,
  };
  function handleAddItem() {
    dispatch(addItem(newItem));
  }

  return (
    <div className="flex py-4">
      <div className="aspect-square w-28 overflow-hidden  rounded-md">
        <img
          src={imageUrl}
          className={
            (soldOut && 'grayscale') +
            `  transition-transform duration-1000 ease-out 
               hover:-translate-x-3 hover:-translate-y-2 hover:rotate-[5deg] hover:scale-150`
          }
          alt=""
        />
      </div>

      <div className="flex grow flex-col px-4">
        <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
        <p className="italic">{newIngredients}</p>
        <span className="grow"></span>
        {soldOut ? (
          <span className="uppercase italic text-slate-600">Sold out</span>
        ) : (
          <span>{formatCurrency(unitPrice)}</span>
        )}
      </div>
      {!soldOut &&
        (!isSelected ? (
          <Button
            onClick={handleAddItem}
            className="min-w-max self-end !py-2 text-sm"
          >
            Add to cart
          </Button>
        ) : (
          <>
            <DeleteButton id={id} />
            <UpdateQuantity
              decreaseQuantity={() => dispatch(decreaseQuantity(id))}
              increaseQuantity={() => dispatch(increaseQuantity(id))}
              pizzaQuantity={pizzaQuantity}
            />
          </>
        ))}
    </div>
  );
});

export default MenuItem;
