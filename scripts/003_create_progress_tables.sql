-- Create lesson completion table
create table if not exists public.lesson_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- Create learning streaks table
create table if not exists public.learning_streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_activity_date date,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Create user statistics table
create table if not exists public.user_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  courses_completed integer default 0,
  courses_in_progress integer default 0,
  total_hours_learned integer default 0,
  total_xp integer default 0,
  current_level integer default 1,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS
alter table public.lesson_completions enable row level security;
alter table public.learning_streaks enable row level security;
alter table public.user_stats enable row level security;

-- Policies
create policy "lesson_completions_select_own"
  on public.lesson_completions for select
  using (user_id = auth.uid());

create policy "lesson_completions_insert_own"
  on public.lesson_completions for insert
  with check (user_id = auth.uid());

create policy "learning_streaks_select_own"
  on public.learning_streaks for select
  using (user_id = auth.uid());

create policy "learning_streaks_update_own"
  on public.learning_streaks for update
  using (user_id = auth.uid());

create policy "user_stats_select_own"
  on public.user_stats for select
  using (user_id = auth.uid());

create policy "user_stats_select_public"
  on public.user_stats for select
  using (true);

create policy "user_stats_update_own"
  on public.user_stats for update
  using (user_id = auth.uid());
