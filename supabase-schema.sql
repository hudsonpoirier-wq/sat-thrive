-- The Agora Project — Supabase Schema
-- Use this if you want multi-user cloud storage instead of localStorage

create table users (
  id bigint primary key,
  email text unique not null,
  name text,
  password text,
  role text default 'student',
  joined text,
  created_at timestamp default now()
);

create table attempts (
  id bigint primary key,
  user_id bigint references users(id),
  date text,
  completed boolean default false,
  scores jsonb,
  weak_topics jsonb,
  answers jsonb,
  mod_idx int default 0,
  post_score int,
  study_plan text,
  manual boolean default false,
  created_at timestamp default now()
);

create table studied_topics (
  user_id bigint references users(id),
  chapter_id text,
  studied_at timestamp default now(),
  primary key (user_id, chapter_id)
);
