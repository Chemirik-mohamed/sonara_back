# Sonara — Backend

Backend API for Sonara, a Text-to-Speech SaaS.

The API handles user authentication and forwards audio generation requests to a TTS inference service.

## Stack

- [Bun](https://bun.sh) — runtime and package manager
- [Hono](https://hono.dev) — HTTP framework
- [PostgreSQL](https://www.postgresql.org) + [Prisma](https://www.prisma.io) — database and ORM
- [Better Auth](https://www.better-auth.com) — authentication (email / password)
- [Zod](https://zod.dev) — input validation
- [Biome](https://biomejs.dev) — linting and formatting

## Prerequisites

- Bun
- A reachable PostgreSQL database
- The TTS inference service running on `http://127.0.0.1:8000`

## Installation

```sh
bun install
```

Copy the example environment file and fill in the values:

```sh
cp .env.example .env
```

| Variable             | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `PORT`               | Port the server listens on                       |
| `DATABASE_URL`       | PostgreSQL connection string                     |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign sessions      |
| `BETTER_AUTH_URL`    | Public URL of the API                            |

To generate a secret: `openssl rand -base64 32`.

## Database

Apply migrations and generate the Prisma client (output to `src/generated/prisma`, not committed):

```sh
bunx --bun prisma migrate dev --config prisma7.config.ts
bunx --bun prisma generate --config prisma7.config.ts
```

## Running the server

```sh
bun run dev
```

The API is available at `http://localhost:3000/api`.

## Endpoints

All routes are prefixed with `/api`.

| Method | Route       | Auth | Description                             |
| ------ | ----------- | ---- | --------------------------------------- |
| `GET`  | `/health`   | No   | Checks that the API is up               |
| `*`    | `/auth/*`   | —    | Better Auth routes (sign up, sign in…)  |
| `POST` | `/generate` | Yes  | Generates a WAV audio file from text    |

### `POST /api/generate`

Requires a valid session cookie.

```json
{ "text": "Hello world" }
```

- `text`: between 1 and 500 characters (after trimming leading and trailing whitespace).
- Response: `200` with an `audio/wav` body.
- Errors: `401` if not authenticated, `400` if the text is invalid.

## Project structure

```text
src/
  modules/        one feature = routes + schema + service
    health/
    tts/
  middlewares/    session, logger
  lib/            shared clients (Prisma, Better Auth)
  errors/         global error handling
  app.ts          Hono app setup
  server.ts       entry point
prisma/
  schema.prisma
  migrations/
```

## CORS

The allowed frontend origin is currently `http://localhost:5173` (set in `src/app.ts` and `src/lib/auth.ts`).
