import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ucfpkiefjbrcwpgmmyhf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZnBraWVmamJyY3dwZ21teWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTY4OTEsImV4cCI6MjA4MjczMjg5MX0.lYTPiTIud0nzt4MQ3Hb-mDh7FfwVsHQEvy9hG3-pKlQ"
);
