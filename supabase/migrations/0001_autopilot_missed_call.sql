-- Anovas Autopilot: missed-call text-back
create table if not exists autopilot_settings (
  company_id uuid primary key references companies(id) on delete cascade,
  twilio_phone_number text,
  forward_to_phone text,
  missed_call_sms_template text not null default 'Hi! Sorry we missed your call. We''ll text you back shortly — feel free to reply here with what you need.',
  missed_call_text_back_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists call_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  call_sid text unique,
  from_number text not null,
  to_number text not null,
  dial_call_status text,
  sms_sent boolean not null default false,
  customer_id uuid references customers(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table autopilot_settings enable row level security;
alter table call_events enable row level security;

create policy "Members can view their company's autopilot settings"
  on autopilot_settings for select
  using (company_id in (select company_id from profiles where id = auth.uid()));

create policy "Members can update their company's autopilot settings"
  on autopilot_settings for all
  using (company_id in (select company_id from profiles where id = auth.uid()))
  with check (company_id in (select company_id from profiles where id = auth.uid()));

create policy "Members can view their company's call events"
  on call_events for select
  using (company_id in (select company_id from profiles where id = auth.uid()));
