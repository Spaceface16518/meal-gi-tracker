# Deferred App Check Setup

Meal Signal is not using Firebase App Check right now. Keep enforcement disabled
until the client, callable functions, and console registration are all updated
and deployed together.

## Setup Steps

1. In Firebase Console, open Project Settings and confirm the Web App ID for
   Meal Signal.
2. Open App Check, register the Web App with the reCAPTCHA Enterprise provider,
   and copy the generated reCAPTCHA Enterprise site key.
3. Add the site key to local and deployed public env in `apps/web/.env.local`
   and `apps/web/apphosting.yaml`:
   `NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY=<site key>`.
4. For local development only, use the App Check debug provider:
   set `NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG=true`, load the app, copy the debug
   token from the browser console, and register that token in Firebase Console
   under App Check > Apps > Manage debug tokens.
5. Initialize App Check in the Firebase client before Auth, Firestore, or
   Functions are used:
   `initializeAppCheck(firebaseApp, { provider: new ReCaptchaEnterpriseProvider(siteKey), isTokenAutoRefreshEnabled: true })`.
6. Add `enforceAppCheck: true` to browser-callable Cloud Functions after the
   client can send valid App Check tokens.
7. Deploy the App Check-enabled web app and functions.
8. Watch App Check request metrics for Firestore and Cloud Functions. Enable
   Firebase Console enforcement only after valid traffic is visible and the
   production app is confirmed working.

## Do Not Enable Yet

- Do not enable Firestore enforcement until the production app has the site key
  configured and has been deployed.
- Do not deploy callable-function App Check enforcement unless the deployed
  client is already initializing App Check.
- Do not commit or share debug tokens.
