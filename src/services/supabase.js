import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://apwylhiihjilprdmnsur.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwd3lsaGlpaGppbHByZG1uc3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1OTU1NTUsImV4cCI6MjAwNTE3MTU1NX0.cGedDyspA_51nWwzbgXtF2d3AYukx7Q7Tvg8uuXzDc0';
const supabase = createClient(supabaseUrl, supabaseKey);

// supabase
//   .rpc('get_schema')
//   .then(({ data: schema, error }) => {
//     if (error) {
//       console.error('Error fetching schema:', error);
//     } else {
//       // Find the table you are interested in (e.g., "orders")
//       const tableName = 'orders';
//       const tableSchema = schema.find((table) => table.name === tableName);

//       if (tableSchema) {
//         // Find the "priority" column in the table schema
//         const priorityColumn = tableSchema.columns.find((column) => column.name === 'priority');

//         if (priorityColumn) {
//           console.log('Priority column data type:', priorityColumn.data_type);
//         } else {
//           console.log('Column "priority" not found in the table schema.');
//         }
//       } else {
//         console.log(`Table "${tableName}" not found in the schema.`);
//       }
//     }
//   });

export default supabase;
