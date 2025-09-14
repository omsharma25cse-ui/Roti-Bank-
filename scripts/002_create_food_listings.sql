-- Create food listings table
create table if not exists public.food_listings (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  quantity text not null,
  expiry_time timestamp with time zone not null,
  pickup_location text not null,
  status text not null default 'available' check (status in ('available', 'claimed', 'completed')),
  volunteer_id uuid references public.profiles(id),
  ngo_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.food_listings enable row level security;

-- RLS policies for food listings
create policy "food_listings_select_all"
  on public.food_listings for select
  using (true);

create policy "food_listings_insert_own"
  on public.food_listings for insert
  with check (auth.uid() = restaurant_id);

create policy "food_listings_update_own"
  on public.food_listings for update
  using (auth.uid() = restaurant_id or auth.uid() = volunteer_id or auth.uid() = ngo_id);

create policy "food_listings_delete_own"
  on public.food_listings for delete
  using (auth.uid() = restaurant_id);
