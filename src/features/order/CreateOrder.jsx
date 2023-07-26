import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import InputContainer from '../../ui/form/InputContainer';
import Button from '../../ui/form/Button';
import FormError from '../../ui/form/Error';
import store from '../../store';
import add from 'date-fns/add';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../ui/form/Label';
import { formatCurrency } from '../../utils/helpers';
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from '../cart/cartSlice';
import { useEffect, useState } from 'react';
import { createOrder as createOrderApi } from '../../services/apiRestaurant';
import { fetchAddress } from '../user/userSlice';
import {
  createOrderSup,
  uploadOrderDetails,
  uploadTotalOrder,
} from '../../services/apiUser';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [address, setAddress] = useState('test');

  const {
    userName,
    address: fetchedAddress,
    addressStaus,
  } = useSelector((state) => state.user);

  const { duration, priorityPrice } = useSelector((state) => state.settings);

  console.log(priorityPrice);

  const total = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);
  const dispatch = useDispatch();
  const error = useActionData();

  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const totalOrder = {
    totalPrice: total,
    totalQuantity,
    priority: withPriority,
    priorityPrice,
    duration,
  };

  function handleGetAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  useEffect(() => {
    setAddress(fetchedAddress);
  }, [fetchedAddress]);

  return (
    <div className="mt-6 flex w-full flex-col">
      <h1>Ready to order? Let's go!</h1>
      <Form method="POST" className="mt-4 flex flex-col gap-5">
        <InputContainer label="Full Name">
          <input
            defaultValue={userName}
            type="text"
            name="customer"
            required
            className="grow rounded-full border px-4 py-3 ring-yellow-400 transition-all
                       duration-300 focus:outline-none focus:ring-2"
          />
        </InputContainer>
        <InputContainer error={error?.phone} label="Phone Number">
          <input
            id="phoneNumber"
            type="text"
            name="phone"
            className="grow rounded-full border px-4 py-3 ring-yellow-400 transition-all
                       duration-300 focus:outline-none focus:ring-2"
          />
        </InputContainer>

        <InputContainer label="Address">
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            className="grow rounded-full border px-4 py-3 ring-yellow-400 transition-all
                       duration-300 focus:outline-none focus:ring-2"
            required
          />
        </InputContainer>
        {addressStaus !== 'idle' && (
          <Button onClick={handleGetAddress}>
            {addressStaus === 'pending' ? 'getting address...' : 'get address'}
          </Button>
        )}

        <div className="flex items-center gap-3">
          <input
            id="priority"
            name="priority"
            className="aspect-square w-6 rounded-md border accent-yellow-400"
            type="checkbox"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <Label htmlFor="priority">Want to yo give your order priority?</Label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="totalOrder"
          value={JSON.stringify(totalOrder)}
        />
        <Button>
          {isSubmitting
            ? 'Placing order....'
            : 'Order now from ' +
              formatCurrency(total + (withPriority && total * priorityPrice))}
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log('data', data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log('order', order);
  const customerData = {
    name: data.customer,
    address: data.address,
    phone: data.phone,
    id: Math.round(Math.random() * 10000),
  };

  // const totalQuantity = order.cart.reduce((acc, cur) => acc + cur.quantity,0)

  const orderId = Math.round(Math.random() * 10000);

  const totalOrderInfo = { ...JSON.parse(data.totalOrder) };

  const priorityPrice =
    order.priority &&
    totalOrderInfo.totalPrice * Number(totalOrderInfo.priorityPrice);

  const totalOrder = {
    totalPrice: totalOrderInfo.totalPrice,
    totalQuantity: totalOrderInfo.totalQuantity,
    priority: order.priority,
    id: orderId,
    status: 'unconfirmed',
    estimatedDelivery: add(new Date(), {
      minutes: Number(totalOrderInfo.duration),
    }),
    customerId: customerData.id,
    priorityPrice
  };

  const orderDetails = order.cart.map((order) => ({
    pizzaId: order.pizzaId,
    quantity: order.quantity,
    orderId,
    id: Math.round(Math.random() * 10000),
  }));

  await createOrderSup(customerData);

  await uploadTotalOrder(totalOrder);

  await uploadOrderDetails(orderDetails);
  // store.dispatch(setAddress(order.address));

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrderApi(order);
  const supabaseOrder = {
    ...order,
  };

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
