import { useState } from 'react';
import Table from '../Table';
import CustomerOrderTable from './CustomerOrderTable';

function CustomerRow({ customer }) {
  const [showOrders, setShowOrders] = useState(false);
  return (
    <Table.Row>
      <td
        className="col-span-full grid grid-cols-[1fr_1fr_1fr_1fr] py-2"
        onClick={() => setShowOrders((show) => !show)}
      >
        <span>{customer.name}</span>
        <span>{customer.phone}</span>
        <span>{customer.address}</span>
        <span className="flex flex-col divide-y text-sm">
          {customer.orders.length}
        </span>
      </td>
      {customer.orders.length > 0 && (
        <td
          className={
            (showOrders && '!grid-rows-[1fr] !border-sky-100 bg-sky-50  py-2') +
            ' ' +
            `col-span-full grid  grid-rows-[0fr] overflow-hidden rounded border border-white/0
           px-4 text-sm transition-all duration-500`
          }
        >
          <span className="overflow-hidden">
            <span className="w-fill mb-2 grid grid-cols-[0.2fr_1fr_1fr_1fr] overflow-hidden text-sm text-sky-950">
              <span>id</span>
              <span>status</span>
              <span>Total Price</span>
              <span>Ordered</span>
            </span>
            {customer.orders.map((order) => (
              <CustomerOrderTable order={order} key={order.id} />
            ))}
          </span>
        </td>
      )}
    </Table.Row>
  );
}

export default CustomerRow;
