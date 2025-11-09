-- Create categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create courses table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category_id uuid references public.categories(id) on delete set null,
  instructor_id uuid references auth.users(id) on delete cascade,
  thumbnail_url text,
  difficulty_level text default 'beginner',
  duration_hours integer,
  xp_reward integer default 100,
  students_enrolled integer default 0,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create lessons table
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  content text,
  order_index integer not null,
  duration_minutes integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user enrollments
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  progress_percent integer default 0,
  unique(user_id, course_id)
);

-- Create skills table
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create course skills junction
create table if not exists public.course_skills (
  course_id uuid references public.courses(id) on delete cascade not null,
  skill_id uuid references public.skills(id) on delete cascade not null,
  primary key (course_id, skill_id)
);

-- Enable RLS
alter table public.categories enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.skills enable row level security;
alter table public.course_skills enable row level security;

-- Category policies
create policy "categories_select_all"
  on public.categories for select
  using (true);

-- Course policies
create policy "courses_select_published"
  on public.courses for select
  using (is_published = true or instructor_id = auth.uid());

create policy "courses_insert_own"
  on public.courses for insert
  with check (instructor_id = auth.uid());

create policy "courses_update_own"
  on public.courses for update
  using (instructor_id = auth.uid());

-- Lesson policies
create policy "lessons_select_published_courses"
  on public.lessons for select
  using (
    exists(
      select 1 from public.courses 
      where courses.id = course_id 
      and (courses.is_published = true or courses.instructor_id = auth.uid())
    )
  );

-- Enrollment policies
create policy "enrollments_select_own"
  on public.enrollments for select
  using (user_id = auth.uid());

create policy "enrollments_insert_own"
  on public.enrollments for insert
  with check (user_id = auth.uid());

create policy "enrollments_update_own"
  on public.enrollments for update
  using (user_id = auth.uid());

-- Skills policies
create policy "skills_select_all"
  on public.skills for select
  using (true);

-- Course skills policies
create policy "course_skills_select_all"
  on public.course_skills for select
  using (true);

-- Seed initial categories
insert into public.categories (name, description, icon) values
  ('Web Development', 'Frontend, backend, and full-stack web development', '🌐'),
  ('Data Science', 'Machine learning, analytics, and data engineering', '📊'),
  ('Mobile Development', 'iOS, Android, and cross-platform development', '📱'),
  ('Cloud & DevOps', 'Cloud infrastructure and deployment tools', '☁️'),
  ('AI & Machine Learning', 'Artificial intelligence and deep learning', '🤖'),
  ('Design', 'UI/UX design and graphic design', '🎨')
on conflict do nothing;

-- Seed initial skills
insert into public.skills (name, category, description) values
  ('React', 'Web Development', 'JavaScript library for building user interfaces'),
  ('Node.js', 'Web Development', 'JavaScript runtime for server-side development'),
  ('Python', 'Data Science', 'Versatile programming language'),
  ('SQL', 'Data Science', 'Relational database query language'),
  ('TypeScript', 'Web Development', 'Typed superset of JavaScript'),
  ('Docker', 'Cloud & DevOps', 'Containerization platform'),
  ('Kubernetes', 'Cloud & DevOps', 'Container orchestration platform'),
  ('TensorFlow', 'AI & Machine Learning', 'Machine learning framework'),
  ('Figma', 'Design', 'Collaborative design tool'),
  ('Next.js', 'Web Development', 'React framework for production')
on conflict do nothing;
