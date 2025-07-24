import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get user from auth header
    const authorization = req.headers.get('authorization')
    if (!authorization) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authorization.replace('Bearer ', '')
    )

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    // Fetch user's speech recordings
    const { data: recordings, error: fetchError } = await supabase
      .from('speech_recordings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Database error:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch recordings' }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    // Generate signed URLs for audio files
    const recordingsWithUrls = await Promise.all(
      recordings.map(async (recording) => {
        const { data: signedUrlData } = await supabase.storage
          .from('speech-recordings')
          .createSignedUrl(recording.audio_url, 3600) // 1 hour expiry

        return {
          ...recording,
          signed_audio_url: signedUrlData?.signedUrl || null
        }
      })
    )

    return new Response(
      JSON.stringify({
        recordings: recordingsWithUrls
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'content-type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    )
  }
})