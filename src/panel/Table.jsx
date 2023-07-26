import { createContext, useContext } from 'react';
import Loading from '../ui/Loading';
import SpinnerMini from '../ui/SpinnerMini';

export const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={columns}>
      <div
        className="h-fit w-full overflow-hidden rounded-lg
                     border-2 border-yellow-400 drop-shadow-md"
      >
        <table className="block h-fit w-full bg-gray-50 text-left">
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  return (
    <thead className="block">
      <Row className="!bg-yellow-200 uppercase">{children}</Row>
    </thead>
  );
}

function Row({ children, className }) {
  const columns = useContext(TableContext);

  return (
    <tr
      style={{ gridTemplateColumns: columns }}
      className={
        className +
        ' ' +
        `grid  w-full border-b-2 px-3 py-2 font-semibold
         transition-all  duration-300 last:border-b-0`
      }
    >
      {children}
    </tr>
  );
}

function Body({ data, render, isLoading }) {
  if (isLoading) return <tbody><SpinnerMini /></tbody>

  if (!data?.length)
    return (
      <tbody>
        <tr><td> No data to show </td></tr>
      </tbody>
    );
  return <tbody className="block">{data.map(render)}</tbody>;
}
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
//   Table.Footer = Footer;
export default Table;
