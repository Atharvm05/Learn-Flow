-- Create trigger function to initialize user_stats on signup
create or replace function public.initialize_user_stats()
returns trigger as $$
begin
  insert into public.user_stats (user_id, total_xp, current_level, courses_completed, courses_in_progress, total_hours_learned)
  values (new.id, 0, 1, 0, 0, 0)
  on conflict (user_id) do nothing;

  insert into public.learning_streaks (user_id, current_streak, longest_streak, last_activity_date)
  values (new.id, 0, 0, null)
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger to initialize stats when profile is created
drop trigger if exists initialize_stats_on_profile_create on public.profiles;
create trigger initialize_stats_on_profile_create
  after insert on public.profiles
  for each row
  execute function public.initialize_user_stats();
