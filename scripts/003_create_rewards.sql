-- Create rewards table
create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  points_required integer not null,
  reward_type text not null check (reward_type in ('badge', 'certificate', 'discount', 'recognition')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default rewards
insert into public.rewards (title, description, points_required, reward_type) values
('Food Saver Badge', 'Awarded for saving 10 meals from waste', 100, 'badge'),
('Community Hero', 'Awarded for saving 50 meals from waste', 500, 'certificate'),
('Sustainability Champion', 'Awarded for saving 100 meals from waste', 1000, 'recognition'),
('Bronze Medal', 'Top 10 contributor this month', 200, 'badge'),
('Silver Medal', 'Top 5 contributor this month', 400, 'badge'),
('Gold Medal', 'Top contributor this month', 800, 'badge');

-- Create user rewards junction table
create table if not exists public.user_rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  reward_id uuid not null references public.rewards(id) on delete cascade,
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, reward_id)
);

alter table public.user_rewards enable row level security;

create policy "user_rewards_select_own"
  on public.user_rewards for select
  using (auth.uid() = user_id);

create policy "user_rewards_insert_own"
  on public.user_rewards for insert
  with check (auth.uid() = user_id);
