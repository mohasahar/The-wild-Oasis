import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://akquvxntiwqdyvttrklu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcXV2eG50aXdxZHl2dHRya2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MzU1MjYsImV4cCI6MjAyODUxMTUyNn0.KL_rqsOQ7m96lfAr8JarJFK1tcqZIaUOMnI6-f8hpfY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
