-- Create user interests/preferences table
create table if not exists public.user_interests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  skill_id uuid references public.skills(id) on delete cascade not null,
  level integer default 1,
  last_updated timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, skill_id)
);

-- Create personalized recommendations table
create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  reason text,
  relevance_score float default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone,
  unique(user_id, course_id)
);

-- Enable RLS
alter table public.user_interests enable row level security;
alter table public.recommendations enable row level security;

-- Policies
create policy "user_interests_select_own"
  on public.user_interests for select
  using (user_id = auth.uid());

create policy "user_interests_insert_own"
  on public.user_interests for insert
  with check (user_id = auth.uid());

create policy "user_interests_update_own"
  on public.user_interests for update
  using (user_id = auth.uid());

create policy "recommendations_select_own"
  on public.recommendations for select
  using (user_id = auth.uid());
