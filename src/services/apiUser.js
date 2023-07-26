import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://apwylhiihjilprdmnsur.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwd3lsaGlpaGppbHByZG1uc3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1OTU1NTUsImV4cCI6MjAwNTE3MTU1NX0.cGedDyspA_51nWwzbgXtF2d3AYukx7Q7Tvg8uuXzDc0';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllCustomers(params) {
  let { data: customers, error } = await supabase
    .from('customers')
    .select('*, orders(*, orderDetails(*, menu(*)))');

  if (error ) {
    console.log(error);
  }

  return customers;
}

export async function createOrderSup(newCustomer) {
  const { data, error } = await supabase
    .from('customers')
    .insert([newCustomer])
    .select();

    if (error) {
      console.log(error);
    }
}

export async function uploadOrderDetails(orderDetails) {
  const { data, error } = await supabase
  .from('orderDetails')
  .insert(orderDetails)
  .select();

  
  if (error) {
    console.log('details',error);
  }
} 

export async function uploadTotalOrder(totalOrder) {
  console.log('api test',totalOrder);
  const { data, error } = await supabase
  .from('orders')
  .insert([totalOrder])
  .select();

  if (error) {
    console.log(error);
  }
} 
