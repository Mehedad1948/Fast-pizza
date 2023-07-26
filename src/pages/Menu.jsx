import { getMenu as getMenuApi } from '../services/supRestaurant';
import MenuItem from '../features/menu/MenuItem';
import { useSelector } from 'react-redux';
import Pagination from '../ui/pagination';
import { useMenu } from '../features/menu/useMenu';
import Loading from '../ui/Loading';


function Menu() {
  const orders = useSelector((state) => state.cart.orders);
  const orderedId = orders.map((order) => order.pizzaId);
  const { menu, count, isLoading } = useMenu();

  console.log('menu', menu);
  if (isLoading) return <Loading />;
  return (
    <div className=''>
      <div className=" flex flex-col divide-y-2 divide-indigo-100">
        {menu.map((pizza) => (
          <MenuItem
            orders={orders}
            isSelected={orderedId.includes(pizza.id)}
            pizza={pizza}
            key={pizza.id}
          />
        ))}
      </div>
      <Pagination count={count} />
    </div>
  );
}

export async function loader(params) {
  const data = await getMenuApi();
  return data;
}

export default Menu;
