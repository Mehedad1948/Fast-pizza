import Button from './form/Button';

function UpdateQuantity({ pizzaQuantity, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="flex items-center gap-3 self-end">
      <Button onClick={decreaseQuantity} className="!py-1 px-2.5">
        -
      </Button>
      <span>{pizzaQuantity}</span>
      <Button onClick={increaseQuantity} className="!py-1 px-2.5">
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
