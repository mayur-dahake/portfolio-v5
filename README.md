# Mayur DevHub Monorepo

Monorepo for a portfolio application with isolated frontend and backend apps.

## Structure

- `apps/frontend` - React + TypeScript (Vite)
- `apps/backend` - Express + TypeScript + Prisma + PostgreSQL
- `packages/types` - shared TypeScript interfaces

## Workspace Setup

```bash
npm install
```

## Run both apps in development

```bash
npm run dev
```

## Backend Quick Start

This project uses [Supabase](https://supabase.com) as the managed PostgreSQL database — no local Docker required.

```bash
# 1. Copy env and fill in your Supabase DATABASE_URL
cp apps/backend/.env.example apps/backend/.env

# 2. Generate Prisma client + run migrations against Supabase
npm run prisma:generate --prefix apps/backend
npm run prisma:migrate --prefix apps/backend -- --name init

# 3. (Optional) Seed with sample data
npm run prisma:seed --prefix apps/backend

# 4. Start the dev server
npm run dev --prefix apps/backend
```

Get your `DATABASE_URL` from: **Supabase Dashboard → Project Settings → Database → URI**
