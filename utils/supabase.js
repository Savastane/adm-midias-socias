import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tpkrqseeyplevbuhqasf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwa3Jxc2VleXBsZXZidWhxYXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NzE4MDYsImV4cCI6MjA0ODA0NzgwNn0.c2mqvCR-vW9pTUM8f3snRpeS_4gYTIgfea4lbzKtGGQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
