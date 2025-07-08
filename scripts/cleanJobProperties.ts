import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function cleanProperties(props: any): Promise<string[]> {
  let arr: string[] = [];
  if (Array.isArray(props)) {
    arr = props;
  } else if (typeof props === 'string') {
    try {
      const parsed = JSON.parse(props);
      arr = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      arr = props.split(',');
    }
  }

  return Array.from(new Set(
    arr
      .map((p) => (p ? String(p).replace(/['"\\]/g, '').trim() : ''))
      .filter((p) => p && p !== '')
  ));
}

async function main() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id, job_properties');

  if (error) {
    console.error('Error fetching profiles:', error.message);
    process.exit(1);
  }

  if (!data) return;

  for (const row of data) {
    const cleaned = await cleanProperties(row.job_properties);
    await supabase
      .from('user_profiles')
      .update({ job_properties: cleaned.length > 0 ? cleaned : null })
      .eq('id', row.id);
  }

  console.log('Job properties cleaned.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
