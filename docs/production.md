# Production Notes

## App Shell

Meal Signal is a private authenticated app. The root route ships as a static
SolidJS/Vite shell, then Firebase Auth and Firestore hydrate user-owned data on
the client.

The app is intentionally marked `noindex` in `apps/web/index.html` so meal and
symptom tracking screens are not treated as public SEO surfaces.

## Metadata and Icons

Common metadata lives in `apps/web/index.html`.

- `VITE_SITE_URL` identifies the production URL. Production uses
  `https://meal.amritr.xyz`.
- `apps/web/public/manifest.webmanifest` exposes installable web app metadata.
- `apps/web/public/sw.js` registers the PWA shell cache and offline fallback.
- `apps/web/public/offline.html` is served for offline navigations. It intentionally
  does not cache private meal or symptom records.

## Caching and Headers

Vercel owns production routing, caching, and headers for the static web app.
Keep service worker caching conservative: `sw.js` should be revalidated on every
request so updates are discovered quickly.

## Error Handling

Expected client failures use `getErrorMessage` in `apps/web/src/lib/errors.ts`, which
maps Firebase Auth, Functions, and Firestore errors to user-facing messages.
Firestore subscriptions accept explicit error callbacks so live update failures
are visible in the app shell.

## Verification

Use the documented Docker/OrbStack workflow so platform-specific optional
packages are installed for the container instead of the host Mac.

```bash
mkdir -p /private/tmp/meal-tracker-node-modules

docker run --rm \
  -v "$PWD:/app" \
  -v /private/tmp/meal-tracker-node-modules:/app/apps/web/node_modules \
  -w /app/apps/web \
  node:22-bookworm npm ci

docker run --rm \
  -v "$PWD:/app" \
  -v /private/tmp/meal-tracker-node-modules:/app/apps/web/node_modules \
  -w /app/apps/web \
  node:22-bookworm npm run lint

docker run --rm \
  -v "$PWD:/app" \
  -v /private/tmp/meal-tracker-node-modules:/app/apps/web/node_modules \
  -w /app/apps/web \
  node:22-bookworm npm run build
```

## Dependency Security

The web package scopes an npm override to Firestore's `@grpc/grpc-js` dependency
using the patched 1.13 maintenance line. Firestore's upstream `~1.9.0` constraint
otherwise retains an affected release. Keep the override until the SDK accepts
a patched gRPC version, and validate SDK reads and writes when changing it.
See the [gRPC security advisory](https://github.com/advisories/GHSA-m9gg-hp2v-232j)
and [error-disclosure advisory](https://github.com/advisories/GHSA-f596-whhp-79r4).
