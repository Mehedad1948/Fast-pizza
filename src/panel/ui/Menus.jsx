import { createContext, useContext, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const MenusContext = createContext();
function Menus({ children, id }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const ref = useOutsideClick(close, false);

  return (
    <MenusContext.Provider value={{ id, close }}>
      <div ref={ref} className="relative">
        <button onClick={() => setOpen((open) => !open)}>
          <HiEllipsisVertical />
        </button>
        {open && <List>{children}</List>}
      </div>
    </MenusContext.Provider>
  );
}

function List({ children }) {
  return (
    <ul
      className="absolute top-1/2 z-50 flex -translate-x-full -translate-y-1/2 flex-col divide-y rounded
               border border-yellow-200 bg-yellow-50   shadow-lg"
    >
      {children}
    </ul>
  );
}

function Button({ icon, children, onClick, disabled }) {
    const {id, close} = useContext(MenusContext)
    
    function handleClick(params) {
        onClick?.()
        close()
    }
  return (
    <li
      onClick={handleClick}
      className="cursor-pointer px-3 py-2 hover:bg-yellow-100"
    >
      <button disabled={disabled} className="flex items-center gap-2">
        {icon} <span> {children} </span>
      </button>
    </li>
  );
}

export default Menus;

Menus.Button = Button;
