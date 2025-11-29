import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qcatufopgkndnmohnbjp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYXR1Zm9wZ2tuZG5tb2huYmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzE1NjksImV4cCI6MjA3OTkwNzU2OX0.uGzKty1bI6cssCeDtq7JVmc3UbdD6idz3vcDR26wY_E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
