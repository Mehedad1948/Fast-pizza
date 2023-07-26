import {
  useFetcher,
  useLoaderData,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { getOrder, updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/form/Button';
import {
  calcMinutesLeft,
  formatCurrency,
} from '../../utils/helpers';
import { useSelector } from 'react-redux';

function Order() {
  const { orderId } = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const fetcher = useFetcher();

  const address = useSelector(state => state.user.address)
  console.log(address);

  const { id, orderPrice, priority, priorityPrice, estimatedDelivery, status } =
    useLoaderData();

  return (
    <div className="flex flex-col gap-8 divide-y divide-slate-300">
      <span>oreder price: {orderPrice}</span>
      <span>
        priority {priority ? 'true' : 'false'}, priority price :{' '}
        {formatCurrency(priorityPrice)}{' '}
      </span>
      <span>estimated delivery: {calcMinutesLeft(estimatedDelivery)}</span>
      <span>status {status}</span>
      {!priority && (
        <fetcher.Form method="PATCH">
          <Button className="mt-8">
          {isSubmitting
              ? 'Prioritizing....'
              : 'Make Priority '}
          </Button>
        </fetcher.Form>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const { orderId } = params;
  const order = await getOrder(orderId);
  console.log(order);
  return order;
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default Order;
