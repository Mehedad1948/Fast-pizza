import { NavLink } from 'react-router-dom';
import Logo from '../../ui/Logo';

function Sidebar() {
  return (
    <div
      className="row-span-full flex flex-col items-center border-r-2 border-yellow-300
                 bg-yellow-50 pt-8
                sm:bg-yellow-300 sm:row-auto sm:mb-6 sm:pt-3"
    >
      <Logo />
      <div className="flex w-full flex-col gap-x-8 px-4 font-semibold sm:flex-row sm:justify-center">
        <NavLink className=" py-4" to="/panel/customers">
          Customers
        </NavLink>
        <NavLink className=" py-4" to="/panel/orders">
          Orders
        </NavLink>
        <NavLink className=" py-4" to="/panel/settings">
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
