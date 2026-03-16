-- Run this in your Supabase SQL Editor

-- Enable RLS
alter table if exists public.profiles enable row level security;

-- Profiles table (mirrors auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text default 'student' check (role in ('student', 'tutor', 'admin')),
  created_at timestamptz default now()
);

-- Test attempts
create table if not exists public.test_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  test_id text not null default 'practice_test_11',
  started_at timestamptz default now(),
  completed_at timestamptz,
  current_section text default 'rw_m1',
  module_time_remaining jsonb default '{"rw_m1":1920,"rw_m2":1920,"math_m1":2100,"math_m2":2100}',
  answers jsonb default '{}',
  scores jsonb,
  weak_topics jsonb,
  study_plan text
);

-- Post-test scores
create table if not exists public.post_scores (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  attempt_id uuid references public.test_attempts(id) on delete set null,
  post_score integer check (post_score between 400 and 1600),
  post_rw integer check (post_rw between 200 and 800),
  post_math integer check (post_math between 200 and 800),
  recorded_at timestamptz default now()
);

-- RLS Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own attempts" on public.test_attempts for select using (auth.uid() = user_id);
create policy "Users can insert own attempts" on public.test_attempts for insert with check (auth.uid() = user_id);
create policy "Users can update own attempts" on public.test_attempts for update using (auth.uid() = user_id);

create policy "Users can view own scores" on public.post_scores for select using (auth.uid() = user_id);
create policy "Users can insert own scores" on public.post_scores for insert with check (auth.uid() = user_id);

-- Admins/tutors can see all
create policy "Admins see all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','tutor'))
);
create policy "Admins see all attempts" on public.test_attempts for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','tutor'))
);
create policy "Admins see all scores" on public.post_scores for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','tutor'))
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
