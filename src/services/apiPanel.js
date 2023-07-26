import supabase, { supabaseUrl } from './supabase';

export async function getOrders(filter, filterPriority, sortBy) {
  let query = supabase.from('orders').select(
    `id, created_at, totalPrice, priority, totalQuantity, status, estimatedDelivery, customers(name), 
      orderDetails(quantity, menu(name))`,
    { count: 'exact' }
  );

  //  Filter
  if (filter) query = query.eq(filter.feild, filter.value);

  //  Filter Priority
  console.log(filterPriority);

  if (filterPriority) {
    console.log('check Filter');
    query = query
      .eq('priority', filterPriority)
      .not('status', 'eq', 'delivered');
  }

  // Sort
  if (sortBy)
    query = query.order(sortBy.feild, {
      ascending: sortBy.direction === 'asc',
    });

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
  }

  return { data, count };
}

export async function updateStatus({ id, status }) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.log(error);
  }

  console.log('update', data);
  return data;
}

export async function getSettings(params) {
  let { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.log(error);
  }

  return data;
}

export async function updateSettings(updateObj) {
  const { data, error } = await supabase
    .from('settings')
    .update(updateObj)
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  return data;
}

export async function deleteOrder({ id }) {
  console.log(id);
  const { data, error } = await supabase.from('orders').delete().eq('id', id);

  if (error) {
    console.log(error);
  }

  console.log('delete', data);
  return data;
}
