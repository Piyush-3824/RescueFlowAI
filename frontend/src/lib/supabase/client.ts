import { createBrowserClient } from "@supabase/ssr";

/**
 * Returns a singleton Supabase browser client.
 * Safe to call multiple times – only one instance is created per page load.
 */
export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseAnonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "[Supabase] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
