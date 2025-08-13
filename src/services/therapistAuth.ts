/**
 * Provides access to a service-role key so the therapist app can
 * obtain an authenticated Supabase JWT. The key should be supplied via
 * the `VITE_SUPABASE_SERVICE_ROLE_KEY` environment variable.
 */
export function getServiceRoleToken(): string | undefined {
  return import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string | undefined;
}
