import { createClient } from "@supabase/supabase-js"

export const createServerSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // admin gerekiyorsa SRK, yoksa anon
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
