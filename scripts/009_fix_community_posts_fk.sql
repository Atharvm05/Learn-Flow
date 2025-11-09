-- Add foreign key from community_posts.user_id to profiles.id
-- This allows Supabase PostgREST to properly join profiles when querying community_posts
alter table public.community_posts
drop constraint if exists community_posts_user_id_fkey;

alter table public.community_posts
add constraint community_posts_user_id_fkey
foreign key (user_id) references public.profiles(id) on delete cascade;

-- Also update post_likes and post_comments to reference profiles for consistency
alter table public.post_likes
drop constraint if exists post_likes_user_id_fkey;

alter table public.post_likes
add constraint post_likes_user_id_fkey
foreign key (user_id) references public.profiles(id) on delete cascade;

alter table public.post_comments
drop constraint if exists post_comments_user_id_fkey;

alter table public.post_comments
add constraint post_comments_user_id_fkey
foreign key (user_id) references public.profiles(id) on delete cascade;
