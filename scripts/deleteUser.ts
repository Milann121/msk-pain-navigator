import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: ts-node scripts/deleteUser.ts <email>');
    process.exit(1);
  }

  const { data, error } = await supabase.auth.admin.listUsers({ email });
  if (error) {
    console.error('Error retrieving user:', error.message);
    process.exit(1);
  }

  const user = data.users[0];
  if (!user) {
    console.log('No user found with the specified email.');
    return;
  }

  const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
  if (deleteError) {
    console.error('Error deleting user:', deleteError.message);
    process.exit(1);
  }

  console.log(`Deleted user ${user.id} (${email}).`);
}

main();
