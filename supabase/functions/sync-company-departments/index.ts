import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { ids } = await req.json().catch(() => ({ ids: [] as string[] }))

    const remoteUrl = Deno.env.get('MINDFUL_SUPABASE_URL')!
    const remoteKey = Deno.env.get('MINDFUL_SUPABASE_SERVICE_ROLE_KEY')!
    const remote = createClient(remoteUrl, remoteKey)

    const localUrl = Deno.env.get('SUPABASE_URL')!
    const localKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const local = createClient(localUrl, localKey)

    let query = remote.from('company_departments').select('*')
    if (ids && ids.length > 0) {
      query = query.in('id', ids)
    }

    const { data: departments, error } = await query
    if (error || !departments) {
      console.error('Fetch error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch departments' }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    const { error: upsertError } = await local
      .from('company_departments')
      .upsert(departments)

    if (upsertError) {
      console.error('Upsert error:', upsertError)
      return new Response(
        JSON.stringify({ error: 'Failed to sync departments' }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ synced: departments.length }),
      { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    )
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    )
  }
})
