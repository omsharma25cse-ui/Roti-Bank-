-- Create a function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, user_type, organization_name, contact_person, phone, address, points)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'user_type', 'volunteer'),
    coalesce(new.raw_user_meta_data ->> 'organization_name', ''),
    coalesce(new.raw_user_meta_data ->> 'contact_person', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'address', ''),
    0
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger to automatically create profile when user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
