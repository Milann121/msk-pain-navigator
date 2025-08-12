
-- Allow unauthenticated users (anon) to call employer search functions on the /auth page
GRANT EXECUTE ON FUNCTION public.search_b2b_employer_names(text, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.search_test2_employer_names(text, integer) TO anon, authenticated;
