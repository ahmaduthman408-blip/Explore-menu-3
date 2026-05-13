import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);
async function test() {
  const { data: d1 } = await supabase.from('products').select('*').limit(1);
  console.log("Before desc:", d1![0].description);
  const { data, error } = await supabase.from('products').update({ description: d1![0].description + ' test' }).eq('id', d1![0].id).select();
  console.log("Update Error:", error);
  console.log("Update Data:", data);
}
test();
