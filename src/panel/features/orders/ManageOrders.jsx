import OrderRow from './OrderRow';
import TableOperations from '../../ui/TableOperations';
import { useOrders } from './useOrders';
import Table from '../../Table';

function ManageOrders() {
  const { orders, count, isLoading } = useOrders();
  return (
    <div className="mx-auto w-full max-w-5xl">
      <TableOperations />
      <Table columns={`0.4fr 0.6fr 0.7fr 0.4fr 1fr 0.7fr 0.2fr`}>
        <Table.Header>
          <th>id</th>
          <th>Customer</th>
          <th>order</th>
          <th>Price</th>
          <th>Time</th>
          <th>status</th>
          <th></th>
        </Table.Header>
        <Table.Body
          isLoading={isLoading}
          data={orders}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />
      </Table>
    </div>
  );
}

export default ManageOrders;
