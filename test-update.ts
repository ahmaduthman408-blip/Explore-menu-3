import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);
async function test() {
  const { data: d1 } = await supabase.from('products').select('id, name, video_url').limit(1);
  console.log("Before:", d1);
  const { data, error } = await supabase.from('products').update({ video_url: 'test' }).eq('id', d1![0].id).select();
  console.log("Update Error:", error);
  console.log("Update Data:", data);
}
test();
