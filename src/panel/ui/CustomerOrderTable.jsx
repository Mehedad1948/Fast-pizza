function CustomerOrderTable({order}) {
    return (
        <span className="w-fill grid grid-cols-[0.2fr_1fr_1fr_1fr] overflow-hidden">
            <span>{order.id}</span>
            <span>{order.status}</span>
            <span>{order.totalPrice}</span>
            <span className="flex flex-col divide-y text-sm">
            {order.orderDetails.map((orderDetail) => (
              <span className='py-1' key={orderDetail.id}>
              {orderDetail.menu.name} X {orderDetail.quantity}
            </span>
          ))}
          </span>
          </span>
    )
}

export default CustomerOrderTable
