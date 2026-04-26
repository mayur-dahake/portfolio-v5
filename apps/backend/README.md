# Backend API

Production-ready portfolio backend using Express, TypeScript, Prisma, and PostgreSQL (hosted on Supabase).

## Database: Supabase

This backend uses [Supabase](https://supabase.com) as the managed PostgreSQL database.

### First-time setup

1. Go to [https://supabase.com](https://supabase.com) and create a new project named `portfolio-db`.
2. Once ready, go to **Project Settings** → **Database** → copy the **URI** connection string.
3. Copy `.env.example` to `.env` and paste your URI:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
PORT=5000
```

4. Run the migration to create all tables in Supabase:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

5. Verify tables were created:

```bash
npm run prisma:studio
# Opens browser UI at http://localhost:5555
# You should see: Project, Experience, Skill, Profile, User tables
```

Alternatively, confirm directly in the Supabase dashboard under **Table Editor**.

## Scripts

| Script                                  | Description                                    |
| --------------------------------------- | ---------------------------------------------- |
| `npm run dev`                           | Start dev server with hot reload               |
| `npm run build`                         | Compile TypeScript                             |
| `npm run start`                         | Run compiled server                            |
| `npm run test`                          | Run Jest unit tests (mocked Prisma)            |
| `npm run test:integration`              | Run integration tests against real Supabase DB |
| `npm run prisma:generate`               | Generate Prisma client                         |
| `npm run prisma:migrate -- --name init` | Run migration against dev DB                   |
| `npm run prisma:migrate:prod`           | Deploy migrations to production DB             |
| `npm run prisma:studio`                 | Open Prisma Studio browser UI                  |

## Integration Tests

Integration tests hit a real Supabase test database. Create a second Supabase project (or schema) for test isolation.

Create `apps/backend/.env.test`:

```env
DATABASE_URL="postgresql://postgres:[TEST-PASSWORD]@db.[TEST-REF].supabase.co:5432/postgres"
PORT=5001
```

Run:

```bash
npm run test:integration
```

Each integration test cleans up its own records in `afterEach` using `deleteMany()`.
