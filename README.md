# Lab 9 Practice Project (Git + CI/CD)

Tech:
- Node.js + TypeScript + Express
- PostgreSQL (via `pg`)
- Jest + Supertest
- ESLint + Prettier
- GitHub Actions CI (lint + tests)

## Run Postgres
```bash
docker compose up -d
```

Create DBs:
```bash
psql "postgresql://postgres:postgres@localhost:5432/postgres" -c "CREATE DATABASE app;"
psql "postgresql://postgres:postgres@localhost:5432/postgres" -c "CREATE DATABASE app_test;"
```

## Configure env
```bash
cp .env.example .env
```

## Install & run
```bash
npm ci
npm run dev
# open http://localhost:3000
```

## Tests & lint
```bash
npm test
npm run lint
```

## Separate branch for logging (lab step #4)
```bash
git switch -c feature/logging
# add logging inside POST /api/auth/login in src/app.ts
git commit -am "feat(logging): log login attempts"
git switch main
git merge feature/logging
```
