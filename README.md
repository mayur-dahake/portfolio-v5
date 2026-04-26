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

```bash
cp apps/backend/.env.example apps/backend/.env
docker compose -f apps/backend/docker-compose.yml up -d
npm run prisma:generate --prefix apps/backend
npm run prisma:migrate --prefix apps/backend -- --name init
npm run dev --prefix apps/backend
```
