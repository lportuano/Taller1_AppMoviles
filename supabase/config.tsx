import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://ctybbpihwtxwfelwdztw.supabase.co',
    'sb_publishable_t_rwTVKZoG8NuJzmiKDN5w_2B3Ert05')