-- Create badges table
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  icon text,
  category text,
  requirement_type text,
  requirement_value integer,
  xp_reward integer default 50,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user badges table
create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, badge_id)
);

-- Create achievements table
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null,
  title text not null,
  description text,
  xp_earned integer default 0,
  achieved_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.achievements enable row level security;

-- Policies
create policy "badges_select_all"
  on public.badges for select
  using (true);

create policy "user_badges_select_own"
  on public.user_badges for select
  using (user_id = auth.uid());

create policy "user_badges_select_public"
  on public.user_badges for select
  using (true);

create policy "achievements_select_own"
  on public.achievements for select
  using (user_id = auth.uid());

-- Seed badges
insert into public.badges (name, description, icon, category, requirement_type, requirement_value, xp_reward) values
  ('First Step', 'Complete your first lesson', '👣', 'learning', 'courses_completed', 1, 50),
  ('Learning Addict', 'Complete 5 courses', '🎓', 'learning', 'courses_completed', 5, 250),
  ('Master Learner', 'Complete 10 courses', '👑', 'learning', 'courses_completed', 10, 500),
  ('Quick Learner', 'Complete a course in under 7 days', '⚡', 'speed', 'streak_days', 7, 200),
  ('Consistent Learner', 'Maintain a 7-day learning streak', '🔥', 'consistency', 'streak_days', 7, 150),
  ('Unstoppable', 'Maintain a 30-day learning streak', '🚀', 'consistency', 'streak_days', 30, 500),
  ('Collaborator', 'Complete your first group project', '🤝', 'social', 'group_projects', 1, 100),
  ('Community Helper', 'Help 5 students in the community', '❤️', 'social', 'help_count', 5, 200),
  ('XP Collector', 'Earn 5000 XP', '⭐', 'xp', 'total_xp', 5000, 300),
  ('Level 10', 'Reach level 10', '🏆', 'levels', 'level', 10, 400)
on conflict do nothing;
