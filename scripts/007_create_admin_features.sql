-- Create admin logs table
create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.admin_logs enable row level security;

-- Policies
create policy "admin_logs_select_admin_only"
  on public.admin_logs for select
  using (
    exists(
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'mentor'
    )
  );
