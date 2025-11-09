-- Create follows table
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references auth.users(id) on delete cascade not null,
  following_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(follower_id, following_id)
);

-- Create posts/updates table
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  course_id uuid references public.courses(id) on delete set null,
  post_type text default 'update',
  likes_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create post likes table
create table if not exists public.post_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id uuid references public.community_posts(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, post_id)
);

-- Create comments table
create table if not exists public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.community_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create mentorship requests table
create table if not exists public.mentorship_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references auth.users(id) on delete cascade not null,
  mentor_id uuid references auth.users(id) on delete cascade not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  responded_at timestamp with time zone
);

-- Enable RLS
alter table public.follows enable row level security;
alter table public.community_posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.post_comments enable row level security;
alter table public.mentorship_requests enable row level security;

-- Follows policies
create policy "follows_select_all"
  on public.follows for select
  using (true);

create policy "follows_insert_own"
  on public.follows for insert
  with check (follower_id = auth.uid());

create policy "follows_delete_own"
  on public.follows for delete
  using (follower_id = auth.uid());

-- Community posts policies
create policy "community_posts_select_all"
  on public.community_posts for select
  using (true);

create policy "community_posts_insert_own"
  on public.community_posts for insert
  with check (user_id = auth.uid());

create policy "community_posts_update_own"
  on public.community_posts for update
  using (user_id = auth.uid());

create policy "community_posts_delete_own"
  on public.community_posts for delete
  using (user_id = auth.uid());

-- Post likes policies
create policy "post_likes_select_all"
  on public.post_likes for select
  using (true);

create policy "post_likes_insert_own"
  on public.post_likes for insert
  with check (user_id = auth.uid());

create policy "post_likes_delete_own"
  on public.post_likes for delete
  using (user_id = auth.uid());

-- Post comments policies
create policy "post_comments_select_all"
  on public.post_comments for select
  using (true);

create policy "post_comments_insert_own"
  on public.post_comments for insert
  with check (user_id = auth.uid());

-- Mentorship requests policies
create policy "mentorship_requests_select_own"
  on public.mentorship_requests for select
  using (requester_id = auth.uid() or mentor_id = auth.uid());

create policy "mentorship_requests_insert_own"
  on public.mentorship_requests for insert
  with check (requester_id = auth.uid());

create policy "mentorship_requests_update_own"
  on public.mentorship_requests for update
  using (mentor_id = auth.uid());
