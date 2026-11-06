# Caderno do Okhema

Aplicativo de celular (PWA) para o caderno das spairas e das letras do Okhema: epítetos, virtudes por grau, palavras-chave, insights, relações, imagens, plantas, atos devocionais, desejos, mitos e hinos; constelações; diário de orações e votos.

## Como funciona

- **Aplicativo**: uma página só (`index.html`), sem etapa de compilação. Publicado pela Vercel a partir deste repositório: cada alteração enviada ao GitHub vira uma nova versão no ar.
- **Banco e contas**: Supabase. Cada devoto cria uma conta com email e senha.
  - O **caderno privado** fica numa área que só o autor lê (regra imposta pelo próprio banco).
  - O **acervo comum** é lido por todos os membros; escrever nele exige aprovação de quem modera.
  - **Constelações** são sempre privadas; o autor pode partilhá-las com a comunidade (exige aprovação).
  - O **acervo de referência** traz epítetos de base (Hermes, Apolo) e só é alterado pela moderação.
- **Sem conta**: dá para usar o caderno só no aparelho, sem acervo comum. Depois, ao criar conta, a aba *Cópia de segurança* oferece trazer essas entradas.

## Instalar no celular

Abra o endereço do aplicativo no navegador e:

- **Android (Chrome)**: menu ⋮ → *Instalar aplicativo* (ou *Adicionar à tela inicial*).
- **iPhone (Safari)**: botão Compartilhar → *Adicionar à Tela de Início*.

## Moderação

A conta `enderman30078@gmail.com` entra automaticamente como moderadora. Na aba **Conta**, a moderação vê a lista de membros e aprova (ou retira a aprovação de) quem pode escrever no acervo comum.

## Arquivos

| Arquivo | Para quê |
|---|---|
| `index.html` | o aplicativo inteiro |
| `config.js` | endereço do Supabase e chave **pública** (publishable) |
| `supabase.js` | biblioteca do Supabase (supabase-js 2.117.3, cópia local) |
| `arithmos.js` | o Ἀριθμός: isopsefia, assinatura poligonal, sigilo e acervo de palavras |
| `glossario.js` | tradução dos termos gregos ao passar o mouse (no computador) |
| `ceu.js`, `astronomy.js` | o Céu: posições dos planetas calculadas no aparelho (astronomy-engine 2.1.19, licença MIT) |
| `manifest.webmanifest`, `icones/` | instalação como aplicativo |
| `sw.js` | abre o aplicativo mesmo sem internet |
| `supabase/schema.sql` | tabelas e regras de segurança do banco |
| `supabase/seed_epitetos.sql` | epítetos do acervo de referência |

A chave em `config.js` é feita para ficar no navegador. **Nunca** coloque neste repositório a chave secreta (`service_role`) nem a senha do banco.

## Configuração do Supabase (uma vez)

Em *Authentication → URL Configuration*, ponha o endereço do aplicativo na Vercel em **Site URL** e também em **Redirect URLs**. Sem isso, os links de confirmação de email e de nova senha levam a um endereço errado.
