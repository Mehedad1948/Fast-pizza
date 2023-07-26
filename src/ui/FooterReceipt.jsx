import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/helpers';
import { Link } from 'react-router-dom';

function FooterReceipt() {
  const orders = useSelector((state) => state.cart.orders);

  const pizzas = orders.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  const total = orders.reduce((acc, cur) => {
    return acc + cur.quantity * cur.unitPrice;
  }, 0);
  return (
    pizzas > 0 && (
      <div
        className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t-2 
                    border-yellow-500 bg-stone-900 px-8 py-4 text-slate-50"
      >
        <div className="flex items-center gap-5">
          <span className="uppercase">{pizzas} Pizzas</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <Link to="/cart" className="uppercase">
          open cart
        </Link>
      </div>
    )
  );
}

export default FooterReceipt;
