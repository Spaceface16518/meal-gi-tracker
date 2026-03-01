# Meal + GI Tracker

Minimal single-user tracker built with Next.js App Router + TypeScript, MongoDB Atlas (official `mongodb` driver), GridFS image storage, and OpenAI Responses API structured extraction.

## Features

- Traditional HTTP Basic auth challenge (`401` + `WWW-Authenticate`) using `APP_PASSCODE`
- Entry type chooser home screen, then separate pages for Meal / GI Event / BM
- Log Meal with required photo + notes
- Log GI Event
- Log BM
- Full-text search on entries
- Meal image storage in GridFS (`GridFSBucket`)
- Meal-only AI extraction with Structured Outputs (`strict: true`)

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
- `APP_PASSCODE`
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, defaults to `gpt-4.1-mini`)

4. Run dev server:

```bash
npm run dev
```

5. Open app in browser and authenticate in the native Basic auth prompt.

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

## API endpoints

All endpoints are auth-protected via HTTP Basic auth.

- `POST /api/entries`
  - `multipart/form-data` for `type=meal` (`type`, `notes`, required `image`)
  - JSON body for `gi_event`/`bm`
- `GET /api/entries/search?q=...&type=...`
- `GET /api/entries/[id]`
- `GET /api/files/[gridFsId]`

## Vercel deployment notes

- Deploy as a standard Next.js app.
- Set all env vars in Vercel project settings.
- Browser compresses meal images before upload to stay under Vercel Function 4.5MB request size limit.
- Server still validates size and rejects payloads over 4.5MB.

## Optional seed data

```bash
npm run seed
```

This inserts one GI event and one BM entry.
