-- Enable extensions
create extension if not exists "uuid-ossp" with schema extensions;

-- Profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  bio text,
  role text check (role in ('fan', 'creator')) not null,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Creators table
create table if not exists creators (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text,
  category text,
  avatar_url text,
  cover_url text,
  price_monthly numeric(10, 2) default 2.99,
  rating numeric(3, 2) default 5.0,
  followers_count integer default 0,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Subscriptions table
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  fan_id uuid not null references profiles(id) on delete cascade,
  creator_id uuid not null references creators(id) on delete cascade,
  tier text check (tier in ('free', 'premium', 'vip')) not null,
  price numeric(10, 2),
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(fan_id, creator_id)
);

-- Conversations table
create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  participant1_id uuid not null references profiles(id) on delete cascade,
  participant2_id uuid not null references profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  check (participant1_id != participant2_id)
);

-- Messages table
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index if not exists profiles_role_idx on profiles(role);
create index if not exists creators_user_id_idx on creators(user_id);
create index if not exists subscriptions_fan_id_idx on subscriptions(fan_id);
create index if not exists subscriptions_creator_id_idx on subscriptions(creator_id);
create index if not exists conversations_participant1_idx on conversations(participant1_id);
create index if not exists conversations_participant2_idx on conversations(participant2_id);
create index if not exists messages_conversation_id_idx on messages(conversation_id);
create index if not exists messages_sender_id_idx on messages(sender_id);

-- Row Level Security (RLS) Policies

-- Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);

-- Creators
alter table creators enable row level security;
create policy "Creators are viewable by everyone" on creators for select using (true);
create policy "Users can update their own creator profile" on creators for update using (user_id = auth.uid());
create policy "Users can insert their own creator profile" on creators for insert with check (user_id = auth.uid());

-- Subscriptions
alter table subscriptions enable row level security;
create policy "Users can view their own subscriptions" on subscriptions for select using (fan_id = auth.uid() or creator_id = (select id from creators where user_id = auth.uid()));
create policy "Users can insert their own subscription" on subscriptions for insert with check (fan_id = auth.uid());
create policy "Users can update their own subscription" on subscriptions for update using (fan_id = auth.uid());

-- Conversations
alter table conversations enable row level security;
create policy "Users can view their conversations" on conversations for select using (participant1_id = auth.uid() or participant2_id = auth.uid());
create policy "Users can create conversations" on conversations for insert with check (participant1_id = auth.uid() or participant2_id = auth.uid());

-- Messages
alter table messages enable row level security;
create policy "Users can view their messages" on messages for select using (
  conversation_id in (
    select id from conversations where participant1_id = auth.uid() or participant2_id = auth.uid()
  )
);
create policy "Users can insert their own messages" on messages for insert with check (sender_id = auth.uid());

-- Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();
create trigger update_creators_updated_at before update on creators
  for each row execute function update_updated_at_column();
create trigger update_subscriptions_updated_at before update on subscriptions
  for each row execute function update_updated_at_column();
create trigger update_conversations_updated_at before update on conversations
  for each row execute function update_updated_at_column();
create trigger update_messages_updated_at before update on messages
  for each row execute function update_updated_at_column();

-- Enable Realtime for messages
alter publication supabase_realtime add table messages;
