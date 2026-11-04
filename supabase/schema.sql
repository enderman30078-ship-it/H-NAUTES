-- Caderno do Okhema · esquema do banco (estado final das migrações
-- "caderno_okhema_inicial" e "funcoes_em_esquema_privado", já aplicadas no projeto).
-- Serve de registro e para recriar o banco num projeto novo. Rode antes de seed_epitetos.sql.

-- Perfis dos devotos
create table public.perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null default '',
  aprovado boolean not null default false,
  moderador boolean not null default false,
  criado_em timestamptz not null default now()
);
alter table public.perfis enable row level security;

-- Entradas do caderno: privadas, do acervo comum, ou do acervo de referência
create table public.itens (
  id text primary key,
  autor uuid references auth.users(id) on delete cascade,
  visibilidade text not null check (visibilidade in ('priv','comum','base')),
  partilhada boolean not null default false,   -- constelação privada mostrada à comunidade
  kind text not null,
  alvo text,
  dados jsonb not null,
  criado_em timestamptz not null default now(),
  editado_em timestamptz not null default now()
);
create index itens_autor_idx on public.itens(autor);
create index itens_vis_idx on public.itens(visibilidade);
alter table public.itens enable row level security;

-- Funções auxiliares, fora do esquema exposto pela API
create schema if not exists privado;
revoke all on schema privado from public, anon;
grant usage on schema privado to authenticated;

create or replace function privado.eh_aprovado() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select aprovado from public.perfis where id = auth.uid()), false)
$$;
create or replace function privado.eh_moderador() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select moderador from public.perfis where id = auth.uid()), false)
$$;
revoke all on function privado.eh_aprovado() from public, anon;
revoke all on function privado.eh_moderador() from public, anon;
grant execute on function privado.eh_aprovado() to authenticated;
grant execute on function privado.eh_moderador() to authenticated;

-- Novo usuário ganha um perfil; o dono do caderno entra aprovado e moderador
create or replace function privado.novo_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
declare dono boolean := lower(new.email) = 'enderman30078@gmail.com';
begin
  insert into public.perfis (id, nome, aprovado, moderador)
  values (new.id,
          coalesce(nullif(new.raw_user_meta_data->>'nome',''), split_part(new.email,'@',1)),
          dono, dono)
  on conflict (id) do nothing;
  return new;
end $$;
revoke all on function privado.novo_perfil() from public, anon, authenticated;
create trigger ao_criar_usuario after insert on auth.users
  for each row execute function privado.novo_perfil();

-- Aprovação de membros: única função pública, recusa quem não modera
create or replace function public.definir_aprovacao(membro uuid, valor boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not privado.eh_moderador() then raise exception 'apenas moderadores'; end if;
  update public.perfis set aprovado = valor where id = membro;
end $$;
revoke all on function public.definir_aprovacao(uuid, boolean) from public, anon;
grant execute on function public.definir_aprovacao(uuid, boolean) to authenticated;

-- PERFIS: membros conectados leem os nomes; cada um muda só o próprio nome
revoke all on public.perfis from anon, authenticated;
grant select on public.perfis to authenticated;
grant update (nome) on public.perfis to authenticated;
create policy perfis_ler on public.perfis for select to authenticated using (true);
create policy perfis_nome on public.perfis for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- ITENS: o caderno privado só é lido pelo autor
revoke all on public.itens from anon, authenticated;
grant select, insert, update, delete on public.itens to authenticated;

create policy itens_ler on public.itens for select to authenticated using (
  autor = auth.uid() or visibilidade in ('comum','base') or partilhada
);
create policy itens_criar on public.itens for insert to authenticated with check (
  autor = auth.uid() and (
    (visibilidade = 'priv' and (not partilhada or privado.eh_aprovado()))
    or (visibilidade = 'comum' and privado.eh_aprovado())
    or (visibilidade = 'base' and privado.eh_moderador())
  )
);
create policy itens_alterar on public.itens for update to authenticated
  using (
    autor = auth.uid()
    or (privado.eh_moderador() and (visibilidade in ('comum','base') or partilhada))
  )
  with check (
    (autor = auth.uid() and (
      (visibilidade = 'priv' and (not partilhada or privado.eh_aprovado()))
      or (visibilidade = 'comum' and privado.eh_aprovado())
      or (visibilidade = 'base' and privado.eh_moderador())
    ))
    or (privado.eh_moderador() and autor is distinct from auth.uid())
  );
create policy itens_apagar on public.itens for delete to authenticated using (
  autor = auth.uid() or (privado.eh_moderador() and visibilidade in ('comum','base'))
);
