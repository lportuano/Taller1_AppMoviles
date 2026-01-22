import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://dghlbrsaiqncoeyrmirf.supabase.co',
    'sb_publishable_sLv-AzqbM26ZCo_WBEbqxA_LfnUX7v1')