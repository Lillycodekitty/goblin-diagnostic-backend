# Goblin Diagnostic Backend

Backend API for the Goblin Diagnostic Center, including OpenAI-powered protocol generation and diagnosis persistence.

## Features

- REST API using Express
- OpenAI integration for AI-generated care protocols
- PostgreSQL database for diagnosis storage
- Local migrations and seeding
- TypeScript and Vitest support

## Getting Started

### Requirements

- Node.js 20+
- PostgreSQL
- OpenAI API key

### Install

```bash
cd c:\Users\alish\goblin-backend
npm install
```

### Setup environment

Copy `.env.example` to `.env` and update:

```env
PORT=4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/goblin_db
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
NODE_ENV=development
```

If you use a dedicated user, update `DATABASE_URL` accordingly, for example:

```env
DATABASE_URL=postgres://goblin_user:goblin_dev@localhost:5432/goblin_db
```

### Local PostgreSQL setup

1. Install PostgreSQL for Windows.
2. Open PowerShell and run:

```powershell
cd c:\Users\alish\goblin-backend\scripts
.\create-local-db.ps1
```

3. Confirm the database exists and the connection string matches `.env`.

If you prefer to create a dedicated app user instead of using `postgres`, use `psql`:

```sql
CREATE DATABASE goblin_db;
CREATE USER goblin_user WITH PASSWORD 'goblin_dev';
GRANT ALL PRIVILEGES ON DATABASE goblin_db TO goblin_user;
```

### Run locally

```bash
npm run build
npm run dev
```

### Run migrations

```bash
npm run db:migrate
```

### Seed database

```bash
npm run db:seed
```

### API Endpoints

- `GET /api/health`
- `POST /api/protocols` - Generate AI care protocol
- `GET /api/diagnoses` - Fetch saved diagnoses
- `POST /api/diagnoses` - Save a diagnosis

### Example protocol request

```bash
curl -X POST http://localhost:4000/api/protocols \
  -H "Content-Type: application/json" \
  -d '{"state":"functional","symptoms":["sleep","caffeine"]}'
```

### Example diagnosis save request

```bash
curl -X POST http://localhost:4000/api/diagnoses \
  -H "Content-Type: application/json" \
  -d '{"state":"functional","symptoms":["sleep","caffeine"],"protocol":["Hydrate","Rest","Eat","Celebrate"],"notes":"Need to drink more water"}'
```

## Notes

- OpenAI usage is billed separately.
- For deploys, Railway is recommended for PostgreSQL and Node hosting.
