# Meal Signal

Meal Signal is a Next.js and Firebase app for tracking meals, GI events, likely
meal irritants, and longer-term correlation signals.

## Stack

- Next.js App Router with TypeScript and Tailwind CSS
- Firebase Auth for account access
- Firestore for user-owned meal, event, and analysis documents
- Firebase Functions for meal ingestion, GI event creation, AI analysis, and weekly scheduled correlation sweeps
- Firebase App Hosting for the web app

## Local Development

Use Docker or OrbStack for development commands.

```bash
docker run --rm -it \
  -v "$PWD:/app" \
  -w /app \
  -p 3000:3000 \
  node:22-bookworm npm run dev -- --hostname 0.0.0.0
```

Create `.env.local` from `.env.local.example` after the Firebase Web App is
registered.

## Firebase Setup

Project ID: `meal-tracker-46346`
Project number: `134287587849`

Register the Web App and write the returned config into `.env.local` and
`apphosting.yaml`:

```bash
firebase apps:create WEB "Meal Signal" --project meal-tracker-46346
firebase apps:sdkconfig WEB <APP_ID> --project meal-tracker-46346
```

Set the Gemini API key as a Functions secret:

```bash
firebase functions:secrets:set GEMINI_API_KEY --project meal-tracker-46346
```

Deploy Auth config, Firestore rules/indexes, Functions, and App Hosting:

```bash
firebase deploy --project meal-tracker-46346
```

Firebase App Hosting requires the project to be on the Blaze plan.

## Checks

```bash
docker run --rm -v "$PWD:/app" -w /app node:22-bookworm npm run lint
docker run --rm -v "$PWD:/app" -w /app node:22-bookworm npm run build
docker run --rm -v "$PWD:/app" -w /app/functions node:22-bookworm npm run lint
docker run --rm -v "$PWD:/app" -w /app/functions node:22-bookworm npm run build
```

For a build before Firebase config exists, pass placeholder
`NEXT_PUBLIC_FIREBASE_*` values.
