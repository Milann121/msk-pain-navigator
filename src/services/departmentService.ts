import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { getServiceRoleToken } from './therapistAuth';

/**
 * Fetches company departments using an authenticated Supabase token.
 * Falls back to the service-role key when no user session is present.
 */
export async function fetchDepartments(): Promise<Array<{ id: string; department_name: string }>> {
  // Try to get the current user's session
  const { data: { session } } = await supabase.auth.getSession();
  let accessToken = session?.access_token;

  // If there's no user session, fall back to the service-role key (if provided)
  if (!accessToken) {
    const serviceRoleKey = getServiceRoleToken();
    if (!serviceRoleKey) {
      return [];
    }
    accessToken = serviceRoleKey;
  }

  // Create a client that uses the authenticated token explicitly
  const client = createClient<Database>(
    (supabase as any).supabaseUrl,
    (supabase as any).supabaseKey,
    {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false }
    }
  );

  const { data, error } = await client
    .from('company_departments')
    .select('id, department_name')
    .order('department_name');

  if (error) {
    console.error('Error loading departments:', error);
    return [];
  }

  return data || [];
}
