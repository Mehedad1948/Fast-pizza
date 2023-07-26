import { format } from 'date-fns';
import Table from '../../Table';
import Priority from '../../ui/Priority';
import Menus from '../../ui/Menus';
import { HiBolt, HiCheckCircle, HiTrash } from 'react-icons/hi2';
import { MdDeliveryDining } from 'react-icons/md';
import { useUpdateStatus } from './useUpdateStatus';
import { useDeleteOrder } from './useDeleteOrder';

function OrderRow({ order }) {
  let {
    id,
    status,
    totalPrice,
    priority,
    created_at,
    estimatedDelivery,
    totalQuantity,
    customers: { name },
    orderDetails,
  } = order;
  
  const { updateStatus, isLoading: isUpdatingStatus } = useUpdateStatus();
  const { deleteOrder, isLoading: isDeletingOrder } = useDeleteOrder();

  console.log(id, priority);
  
  function handleUpdateStatus(status) {
    updateStatus({ id, status });
  }

  return (
    <Table.Row
      className={`
    ${status === 'delivered' && 'bg-emerald-50'}
    ${status === 'unconfirmed' && 'bg-rose-50'}
    `}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td className="flex flex-col divide-y">{totalQuantity} Pizzas</td>
      <td>{totalPrice}</td>
      <td className="flex flex-col gap-2">
        <span> {format(new Date(created_at), 'MM/dd/yyyy, hh:mm a')}</span>
        <span> {status === 'pending' && estimatedDelivery}</span>
      </td>
      <td className="flex items-center justify-between text-sm">
        <span
          className={`flex items-center gap-3 capitalize
          ${status === 'pending' && 'text-sky-500'}
          ${status === 'delivered' && 'text-emerald-500'}  
          ${status === 'unconfirmed' && 'text-rose-500'}  
        `}
        >
          <span> {status}</span>
          <span> {priority && status === 'unconfirmed' && <HiBolt />}</span>
        </span>
        {priority && status === 'pending' && <Priority />}
      </td>
      <td className="flex items-center justify-center">
        <Menus id={id}>
          {status === 'unconfirmed' && (
            <Menus.Button
              onClick={() => handleUpdateStatus('pending')}
              icon={<HiCheckCircle />}
              disabled={isUpdatingStatus}
            >
              Accept
            </Menus.Button>
          )}
          {status === 'pending' && (
            <Menus.Button
              disabled={isUpdatingStatus}
              onClick={() => handleUpdateStatus('delivered')}
              icon={<MdDeliveryDining />}
            >
              Deliver
            </Menus.Button>
          )}
          <Menus.Button
            disabled={isDeletingOrder}
            onClick={() => deleteOrder({ id })}
            icon={<HiTrash />}
          >
            Delete
          </Menus.Button>
        </Menus>
      </td>
    </Table.Row>
  );
}

export default OrderRow;
