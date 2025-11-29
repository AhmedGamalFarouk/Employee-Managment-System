-- Create employees table
create table employees (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position text,
  phone text,
  email text,
  image_url text,
  whatsapp_link text,
  linkedin_link text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table employees enable row level security;

-- Create policies
-- Allow public read access
create policy "Public employees are viewable by everyone."
  on employees for select
  using ( true );

-- Allow authenticated users (admin) to insert, update, delete
-- Note: Since we are using a dummy auth for the frontend admin panel, 
-- for a real app we would use Supabase Auth. 
-- For this demo with dummy auth, we might need to open up RLS or use a service role key if we wanted to be strict,
-- but for simplicity with the client-side dummy auth, we will allow public write for this demo 
-- OR strictly speaking, the user asked for dummy auth on frontend but Supabase for DB.
-- If we use the anon key, we need policies that allow anon operations if we aren't actually logging in to Supabase.
-- Let's allow all for anon for this specific demo scope as requested "Bypass/Dummy Mode".

create policy "Enable all access for all users"
  on employees for all
  using ( true )
  with check ( true );
