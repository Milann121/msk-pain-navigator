
-- Allow unauthenticated users (anon) and authenticated users to call employer search RPCs
GRANT EXECUTE ON FUNCTION public.search_b2b_employer_names(text, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.search_test2_employer_names(text, integer) TO anon, authenticated;
