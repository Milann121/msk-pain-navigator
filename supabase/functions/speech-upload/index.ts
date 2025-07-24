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

    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    const durationSeconds = formData.get('duration') as string

    if (!audioFile) {
      return new Response(
        JSON.stringify({ error: 'Audio file is required' }),
        { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `${user.id}/${timestamp}.webm`

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('speech-recordings')
      .upload(fileName, audioFile, {
        contentType: 'audio/webm',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: 'Failed to upload audio file' }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    // Save record to database
    const { data: recordData, error: recordError } = await supabase
      .from('speech_recordings')
      .insert({
        user_id: user.id,
        audio_url: uploadData.path,
        duration_seconds: durationSeconds ? parseInt(durationSeconds) : null,
        file_size_bytes: audioFile.size
      })
      .select()
      .single()

    if (recordError) {
      console.error('Database error:', recordError)
      return new Response(
        JSON.stringify({ error: 'Failed to save recording' }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        recording: recordData
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