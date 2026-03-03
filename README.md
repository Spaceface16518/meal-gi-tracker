# Meal + GI Tracker

Minimal multi-user tracker built with Next.js App Router + TypeScript, MongoDB Atlas (official `mongodb` driver), GridFS image storage, and OpenAI Responses API structured extraction.

## Features

- Auth.js (`next-auth`) Credentials auth with MongoDB-backed users
- Email/password registration + login
- Session-based auth (JWT cookie), route protection via middleware
- Entry type chooser home screen, then separate pages for Meal / GI Event / BM
- Log Meal with optional photo + notes
- Log GI Event
- Log BM
- Full-text search on entries
- Meal image storage in GridFS (`GridFSBucket`)
- Meal-only AI extraction with Structured Outputs (`strict: true`)
- Retry AI summary from entry detail (meal entries with an image)
- Server-first architecture: entry create/search/read uses server actions + server utilities

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy env file:

```bash
cp .env.example .env.local
```

3. Fill `.env.local`:

- `MONGODB_URI` (optional, defaults to `mongodb://127.0.0.1:27017`)
- `MONGODB_DB` (optional, defaults to `ibs_tracker`)
- `AUTH_SECRET` (required, random long string for signing session cookies)
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, defaults to `gpt-4.1-mini`)
- `OPENAI_WEBHOOK_SECRET` (required for verifying OpenAI webhook signatures)
- `APP_BASE_URL` (required for documenting your public webhook URL, e.g. `https://your-app.vercel.app`)

4. Run dev server:

```bash
npm run dev
```

5. Open app in browser, register an account at `/register`, then sign in at `/login`.

## MongoDB Atlas setup

1. Create Atlas cluster.
2. Create database user with read/write access.
3. Add your IP/network access rule.
4. Put Atlas connection string into `MONGODB_URI`.

### Create text index

Run in Atlas shell / mongosh:

```javascript
db.entries.createIndex({ "search.text": "text", "input.notes": "text" });
```

## OpenAI webhook setup (background meal extraction)

Meal extraction is queued with `background: true` and completed asynchronously through OpenAI webhooks. Configure this once per OpenAI project:

1. Deploy your app so OpenAI can reach it over HTTPS.
2. In the OpenAI dashboard, open your project webhook settings and create a webhook endpoint:
   - URL: `https://<your-domain>/api/openai/webhook`
   - Subscribe to events: `response.completed` and `response.failed`
3. Copy the webhook signing secret from OpenAI and set it as `OPENAI_WEBHOOK_SECRET` in your deployment environment.
4. Ensure `OPENAI_API_KEY` is set for the same project where the webhook is configured.
5. Create a meal entry. The entry saves immediately, and the AI fields are populated later when OpenAI posts back to your webhook.

If the webhook is misconfigured or unreachable, entries still save, but `aiJob.status` is marked `failed`.

## API endpoints

All app flows use server components/actions directly. Only file streaming uses an API route:

- `GET /api/files/[gridFsId]`
- `POST /api/openai/webhook` (OpenAI background response callbacks)

## Vercel deployment notes

- Deploy as a standard Next.js app.
- Set all env vars in Vercel project settings.
- Browser compresses meal images before upload to stay under Vercel Function 4.5MB request size limit.
- Server still validates size and rejects payloads over 4.5MB.

## Optional seed data

```bash
npm run seed
```

This inserts one GI event and one BM entry for `SEED_USER_ID` (ObjectId hex; if omitted, a new id is generated).
