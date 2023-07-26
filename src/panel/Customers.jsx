import { getAllCustomers } from '../services/apiUser';
import { useQuery } from '@tanstack/react-query';
import Loading from '../ui/Loading';
import Table from './Table';
import CustomerRow from './ui/CustomerRow';

function Customers() {
  const {
    isLoading,
    error,
    data: customers,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
  });
  // if (isLoading) return <Loading />;
  
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Table columns={`1fr 1fr 1fr 1fr`}>
        <Table.Header>
          <th>Customer</th>
          <th>Phone</th>
          <th>address</th>
          <th>orders</th>
        </Table.Header>
        <Table.Body
          data={customers}
          render={(customer) => (
            <CustomerRow key={customer.id} customer={customer} />
          )}
        />
      </Table>
    </div>
  );
}

export default Customers;
