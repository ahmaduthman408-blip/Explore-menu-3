/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are not set. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

export const isPlaceholder = !supabaseUrl;

export const supabase = createClient(
  supabaseUrl || 'https://xwfxpjwcqddavwzsfoct.supabase.co',
  supabaseAnonKey || 'dummy_key_to_prevent_crash_in_dev'
);
