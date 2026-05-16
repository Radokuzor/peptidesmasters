import { createClient } from "@supabase/supabase-js";

// Fallback to placeholder so the module loads during build even without env vars.
// Actual requests will only run at runtime on Vercel where env vars are set.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder";

// Browser / server component client (uses anon key + RLS)
export const supabase = createClient(url, anonKey);

// Server-only admin client (bypasses RLS — only use in API routes)
export function createAdminClient() {
  return createClient(url, serviceKey);
}
