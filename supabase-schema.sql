-- Run this in your Supabase SQL Editor

-- Extensions (needed for gen_random_uuid)
create extension if not exists pgcrypto;

-- Profiles table (mirrors auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text not null default 'student' check (role in ('student', 'tutor', 'admin')),
  created_at timestamptz not null default now()
);

-- Test attempts
create table if not exists public.test_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  test_id text not null default 'practice_test_11',
  is_sandbox boolean not null default false,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  current_section text not null default 'rw_m1',
  module_time_remaining jsonb not null default '{"rw_m1":1920,"rw_m2":1920,"math_m1":2100,"math_m2":2100}',
  answers jsonb not null default '{}',
  scores jsonb,
  weak_topics jsonb,
  study_plan text
);

-- Post-test scores
create table if not exists public.post_scores (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  attempt_id uuid references public.test_attempts(id) on delete set null,
  is_sandbox boolean not null default false,
  post_score integer check (post_score between 400 and 1600),
  post_rw integer check (post_rw between 200 and 800),
  post_math integer check (post_math between 200 and 800),
  recorded_at timestamptz not null default now()
);

-- Study progress (per chapter)
create table if not exists public.studied_topics (
  user_id uuid references public.profiles(id) on delete cascade not null,
  chapter_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id)
);

-- Answer keys for additional tests (admin-managed)
create table if not exists public.test_answer_keys (
  test_id text primary key,
  answer_key jsonb not null,
  updated_at timestamptz not null default now()
);

-- Helpful indexes for scale
create index if not exists idx_test_attempts_user_started on public.test_attempts(user_id, started_at desc);
create index if not exists idx_test_attempts_completed_at on public.test_attempts(completed_at);
create index if not exists idx_test_attempts_sandbox on public.test_attempts(is_sandbox);
create index if not exists idx_post_scores_user_recorded on public.post_scores(user_id, recorded_at desc);
create index if not exists idx_post_scores_attempt_id on public.post_scores(attempt_id);
create index if not exists idx_post_scores_sandbox on public.post_scores(is_sandbox);
create index if not exists idx_studied_topics_user_completed on public.studied_topics(user_id, completed);

-- Enable RLS (required for policies to take effect)
alter table public.profiles enable row level security;
alter table public.test_attempts enable row level security;
alter table public.post_scores enable row level security;
alter table public.studied_topics enable row level security;
alter table public.test_answer_keys enable row level security;

-- Role helper (admin only)
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- RLS Policies (drop/recreate safe)
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Admins see all profiles" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins see all profiles" on public.profiles for select using (public.is_admin());

-- Note: no user UPDATE policy on profiles (prevents self-escalation to admin/tutor).

drop policy if exists "Users can view own attempts" on public.test_attempts;
drop policy if exists "Users can insert own attempts" on public.test_attempts;
drop policy if exists "Users can update own attempts" on public.test_attempts;
drop policy if exists "Users can delete own sandbox attempts" on public.test_attempts;
drop policy if exists "Admins see all attempts" on public.test_attempts;
drop policy if exists "Admins can insert attempts" on public.test_attempts;
drop policy if exists "Admins can update attempts" on public.test_attempts;
create policy "Users can view own attempts" on public.test_attempts for select using (auth.uid() = user_id);
create policy "Users can insert own attempts" on public.test_attempts for insert with check (auth.uid() = user_id);
create policy "Users can update own attempts" on public.test_attempts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own sandbox attempts" on public.test_attempts for delete using (auth.uid() = user_id and is_sandbox = true);
create policy "Admins see all attempts" on public.test_attempts for select using (public.is_admin());
create policy "Admins can insert attempts" on public.test_attempts for insert with check (public.is_admin());
create policy "Admins can update attempts" on public.test_attempts for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Users can view own scores" on public.post_scores;
drop policy if exists "Users can insert own scores" on public.post_scores;
drop policy if exists "Users can delete own sandbox scores" on public.post_scores;
drop policy if exists "Admins see all scores" on public.post_scores;
drop policy if exists "Admins can insert scores" on public.post_scores;
drop policy if exists "Admins can update scores" on public.post_scores;
create policy "Users can view own scores" on public.post_scores for select using (auth.uid() = user_id);
create policy "Users can insert own scores" on public.post_scores for insert with check (auth.uid() = user_id);
create policy "Users can delete own sandbox scores" on public.post_scores for delete using (auth.uid() = user_id and is_sandbox = true);
create policy "Admins see all scores" on public.post_scores for select using (public.is_admin());
create policy "Admins can insert scores" on public.post_scores for insert with check (public.is_admin());
create policy "Admins can update scores" on public.post_scores for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Users can view own studied topics" on public.studied_topics;
drop policy if exists "Users can upsert own studied topics" on public.studied_topics;
drop policy if exists "Admins see all studied topics" on public.studied_topics;
create policy "Users can view own studied topics" on public.studied_topics for select using (auth.uid() = user_id);
create policy "Users can upsert own studied topics" on public.studied_topics for insert with check (auth.uid() = user_id);
create policy "Users can update own studied topics" on public.studied_topics for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Admins see all studied topics" on public.studied_topics for select using (public.is_admin());

drop policy if exists "Users can view test answer keys" on public.test_answer_keys;
drop policy if exists "Admins can upsert test answer keys" on public.test_answer_keys;
create policy "Users can view test answer keys" on public.test_answer_keys for select using (auth.role() = 'authenticated');
create policy "Admins can upsert test answer keys" on public.test_answer_keys for insert with check (public.is_admin());
create policy "Admins can update test answer keys" on public.test_answer_keys for update using (public.is_admin()) with check (public.is_admin());

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
