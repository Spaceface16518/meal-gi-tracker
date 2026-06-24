# Meal Signal Product Behavior Specification

This document describes the current Meal Signal web app as implemented in this repository. It is intended as a language- and platform-agnostic reference for future clients, including a companion Swift app. It focuses on product behavior, data contracts, validation, privacy boundaries, and user-visible workflows rather than web-specific layout details.

## Product Purpose

Meal Signal is a private meal and GI event tracker. Users log meals, bowel or GI events, and optional details. The app analyzes meals for likely irritants, then generates cautious correlation signals between logged irritants and later GI events.

The product must avoid medical certainty. Analysis language should remain exploratory, using wording such as "possible sensitivity", "associated with symptoms", or "tracking signal", not diagnosis or causation.

## Primary Users and Access

- The app is private and requires authentication before any tracking data is shown.
- Supported sign-in methods are email/password and Google account sign-in.
- Supported account creation is email/password sign-up.
- Passwords must be at least 6 characters because Firebase Auth enforces that requirement.
- Google sign-in prompts the user to choose an account.
- Sign-out is available from the authenticated app shell.
- If Firebase client configuration is missing, the app does not show the tracker. It shows a configuration-missing state.
- While auth state is loading, the app shows a loading state.
- Unauthenticated users see only the authentication screen.
- On successful auth, the app ensures a user profile exists or is updated for the authenticated UID.

## User Profile Behavior

Each authenticated user has one profile record keyed by auth UID.

Profile fields:

- `uid`: required, immutable owner UID.
- `email`: optional auth email.
- `displayName`: optional auth display name.
- `createdAt`: profile creation timestamp.
- `updatedAt`: profile update timestamp.

When a profile already exists, auth email, display name, and `updatedAt` are refreshed. When a profile does not exist, it is created.

Users can read their own profile. Users cannot delete profiles through the client. User profiles are not shared between users.

## App Structure and Navigation

Authenticated users get two main app sections:

- Log: meal logging, GI event logging, and skin tracking.
- Analysis: correlation analysis, analysis display, and bulk exports.

The authenticated screen also includes:

- A stats summary with meal count, GI event count, skin entry count, and current top signal.
- A combined Recent list of meals, GI events, and skin entries.
- A user identity display using the signed-in email.
- A sign-out control.

The default view after loading is Log.

## Live Data Loading

The client subscribes to live per-user data:

- Meals: latest 25 records ordered by `eatenAt` descending.
- GI events: latest 25 records ordered by `occurredAt` descending.
- Skin entries: latest 25 records ordered by `sortAt` descending.
- Current analysis: the per-user `analyses/current` document.

If a live subscription fails, the app shows a user-visible error that live updates are temporarily unavailable.

The Recent list combines the currently subscribed meals, GI events, and skin entries, sorts them by their event time descending, and shows the latest combined entries.

Exports fetch all per-user meals, GI events, and skin entries, not only the subscribed 25-record windows.

## Date and Time Behavior

- New meal and event forms default their date/time field to the user's current local date and time.
- Date/time inputs are validated before submission.
- Submitted date/time values are converted to ISO strings by the client and stored as timestamps by the backend.
- Invalid meal times show "Choose a valid meal time."
- Invalid GI event times show "Choose a valid event time."
- Invalid skin observation times show "Choose a valid observation time."
- Recent entries display relative times:
  - Under 1 minute: `just now`.
  - Under 60 minutes: rounded minutes with `m ago`.
  - Under 24 hours: rounded hours with `h ago`.
  - Under 7 days: rounded days with `d ago`.
  - Older: localized calendar date, including year only when different from the current year.

## Meal Logging

Users can log meals in three input modes:

- Text.
- Voice.
- Image.

Every meal has:

- Input mode.
- Raw input marker or submitted text.
- Interpreted text.
- Eaten-at time.
- Optional notes.
- Status.
- Structured meal analysis.
- Creation and update timestamps.
- Optional reanalysis timestamp.

Meal notes are optional and trimmed. Empty notes are omitted. Notes must be at most 1000 characters.

### Text Meal Behavior

- Text mode is the default meal input mode.
- Users enter free-form meal text.
- Text meal submission is enabled only when trimmed text length is greater than 2 characters.
- The backend requires non-empty text and caps it at 8000 characters.
- For text meals, raw input and interpreted text are the submitted text.
- Text meal analysis uses Gemini when available and falls back to deterministic heuristic analysis if Gemini is unavailable or fails.

After a successful meal save:

- Meal text is cleared.
- Notes are cleared.
- Media state is cleared.
- Eaten-at resets to the current local date/time.
- A "Meal saved." success message is shown.

### Voice Meal Behavior

- Voice mode records audio through the device microphone when supported and permitted.
- If audio recording is unsupported, the user sees "Audio recording is not available in this browser."
- If microphone permission fails or is denied, the user sees "Microphone access was not granted." unless a more specific error is available.
- Recording toggles between start and stop.
- On stop, recorded chunks are combined into one audio blob.
- The recording MIME type is taken from the recorder when available, otherwise `audio/webm`.
- Audio submissions must be under 5 MB on the client.
- Oversized recordings clear prepared media and show "Use a shorter recording under 5 MB."
- A prepared recording shows an audio-ready state.
- Voice meal submission is enabled only when media bytes have been prepared and a MIME type is present.
- The backend accepts only audio MIME types for voice media after normalizing away parameters such as codecs.
- Voice media requires Gemini interpretation. If Gemini media analysis fails, the meal is not saved and the user is told to try a shorter recording or enter the meal as text.
- If no Gemini API key is configured, voice media is saved with a placeholder interpretation and heuristic analysis.

### Image Meal Behavior

- Image mode lets users choose or capture an image.
- The image picker accepts images and hints for environment camera capture.
- Image files must be under 5 MB on the client.
- Oversized images clear prepared media and show "Use an image smaller than 5 MB."
- Successful image preparation shows "Image ready."
- Image meal submission is enabled only when media bytes have been prepared and a MIME type is present.
- The backend accepts only image MIME types for image media after normalizing away parameters.
- Image media requires Gemini interpretation. If Gemini media analysis fails, the meal is not saved and the user is told to try a smaller image or enter the meal as text.
- If no Gemini API key is configured, image media is saved with a placeholder interpretation and heuristic analysis.

### Meal Analysis Output

Meal analysis contains:

- `mealName`: short display name.
- `foods`: list of food items.
- `irritants`: likely irritant signals.
- `summary`: plain-language meal description.

Irritant signals contain:

- `name`: specific irritant name where possible.
- `category`: one of `dairy`, `gluten`, `fodmap`, `fat`, `spice`, `caffeine`, `alcohol`, `additive`, `fiber`, or `other`.
- `confidence`: number from 0 to 1.
- `evidence`: brief reason.

Generated meal analysis is normalized:

- Foods are limited to 24 items, 80 characters each.
- Irritants are limited to 20 items.
- Meal name is limited to 120 characters.
- Summary is limited to 500 characters.
- Invalid categories become `other`.
- Missing confidence defaults conservatively and is clamped from 0 to 1.

The default prompt asks for conservative confidence, specific irritants, and common GI irritant mappings for dairy, gluten, FODMAPs, fat, spice, caffeine, alcohol, carbonation, additives, and related categories.

### Heuristic Meal Analysis

When Gemini is unavailable for text analysis, the backend still saves the text meal using deterministic rules.

The heuristic detects terms related to:

- Beer or malt beverages: alcohol, barley/gluten, barley fructans, carbonation.
- Dairy terms: lactose/dairy.
- Wheat or bread terms: wheat/gluten and wheat fructans.
- Barley, rye, malt: gluten grain and grain fructans.
- Onion, garlic, leeks, shallots, inulin, chicory: fructans.
- Beans, lentils, chickpeas, peas, cashews, pistachios: GOS/FODMAP.
- Apple, pear, mango, watermelon, honey, high-fructose corn syrup: excess fructose.
- Polyol foods or sweeteners: polyols.
- Fried, fast-food, bacon, sausage, pepperoni, rich sauce, heavy cream: high fat.
- Spicy or pepper-heavy foods: spice/capsaicin.
- Coffee, espresso, cola, energy drinks, black tea, green tea, matcha: caffeine.
- Wine, cocktails, liquor, hard seltzer: alcohol.
- Soda, sparkling water, carbonated drinks, seltzer, tonic: carbonation.
- Processed meats, cured meats, emulsifiers, artificial sweeteners: additives.

Heuristic foods are split from the text on commas, semicolons, or new lines, limited to 12 entries. If no split foods are found, the first 80 characters are used as the food entry. Heuristic summary is the first 500 characters.

## Meal Reanalysis

Each meal in Recent supports reanalysis.

Behavior:

- Reanalysis calls the backend with the meal ID.
- The meal ID must be non-empty, at most 160 characters, and match letters, numbers, underscore, or hyphen.
- Reanalysis is scoped to the authenticated user's own meal collection.
- If the meal is not found, the user sees a not-found error.
- For text meals, the source is raw input when present, otherwise interpreted text.
- For media meals, the source is interpreted text when present, otherwise raw input.
- Reanalysis uses text meal analysis, not the original media payload.
- Successful reanalysis updates analysis, interpreted text, status, `updatedAt`, and `reanalyzedAt`.
- The Recent entry shows a pending state for the meal being refreshed.
- Success message: "Meal analysis refreshed."

## GI Event Logging

Users can log GI events with:

- Occurred-at date/time.
- Severity from 1 to 10.
- Zero or more symptom tags.
- Optional Bristol stool type from 1 to 7.
- Optional duration in minutes.
- Optional notes.

Default state:

- Occurred-at defaults to current local date/time.
- Severity defaults to 4.
- No symptoms are selected.
- No stool type is set.
- Duration and notes are empty.

Supported symptom tags:

- cramping.
- bloating.
- reflux.
- nausea.
- diarrhea.
- constipation.
- gas.
- pain.

Symptom tags toggle on and off. The backend allows up to 12 symptoms, with each item trimmed and capped at 40 characters.

At least one symptom or a stool type is required. A stool-type-only event is valid.

### GI Event Validation

Backend validation:

- User must be authenticated.
- `occurredAt` is required and must be a valid date.
- `severity` must be a number from 1 to 10.
- `symptoms` must be an array with 0 to 12 items.
- Empty symptoms are allowed only when `stoolType` is present.
- `stoolType`, when present, must be a number from 1 to 7.
- `durationMinutes`, when present, must be a number from 1 to 1440.
- `notes`, when present, must be a string at most 1000 characters.

Client validation:

- Save is disabled while neither symptoms nor stool type is set.
- Submitting without symptoms or stool type shows "Choose a symptom or stool type."
- Invalid event time shows "Choose a valid event time."

After a successful event save:

- Occurred-at resets to current local date/time.
- Severity resets to 4.
- Symptoms clear.
- Notes clear.
- Stool type clears.
- Duration clears.
- A "Event saved." success message is shown.

### Bristol Stool Type Behavior

- Stool type follows the Bristol stool scale from 1 to 7.
- The stool type control starts visually at 4 but is semantically unset until the user interacts with it.
- Pointer interaction on an unset stool type sets it to 4 before movement.
- Keyboard interaction on an unset stool type with arrow keys, Home, or End sets it to 4 before adjustment.
- A selected stool type can be cleared.
- The app links to the Bristol stool scale reference.

Stool type labels:

- 1: Separate hard lumps.
- 2: Lumpy sausage.
- 3: Cracked sausage.
- 4: Smooth soft sausage.
- 5: Soft blobs.
- 6: Mushy pieces.
- 7: Watery.

## Skin Tracking

Users can log skin state separately from GI events in two modes:

- Day: one editable current skin-quality assessment for a local calendar date.
- Time: a specific skin observation or flare at a date/time.

Day-mode skin entries have:

- One assessment per supported chronic skin condition.
- A severity slider from 0 to 10 for each condition.
- Zero or more body area tags for each condition.
- Optional notes.

Supported daily skin conditions:

- acne.
- eczema.
- psoriasis.
- moles.
- rosacea.
- dryness.

Timed skin observations have:

- Severity from 1 to 10.
- One or more skin symptom tags.
- Zero or more body area tags.
- Optional duration in minutes.
- Optional notes.

Supported timed skin symptom tags:

- rash.
- itching.
- hives.
- flushing.
- dryness.
- swelling.
- eczema flare.

Supported body area tags:

- face.
- neck.
- chest.
- back.
- arms.
- hands.
- legs.
- scalp.
- other.

Day-mode skin entries use deterministic document IDs in the form `daily_YYYY-MM-DD`, so saving the same local date updates that day's skin state instead of creating a duplicate. Timed skin observations use generated document IDs and multiple timed observations can exist on the same day.

The client stores the last saved day-mode condition slider values and per-condition body areas in local storage. New day-mode logs preload those values because chronic skin condition locations and severities usually change gradually.

Skin entries are tracked and exported, but they do not participate in the current GI-focused correlation analysis, deterministic sensitivity scoring, or Gemini correlation prompt.

### Skin Entry Validation

Backend validation:

- User must be authenticated.
- `entryType` must be `daily` or `timed`.
- Daily entries require `conditions`, an array with 1 to 12 items.
- Each daily condition has a condition name, severity from 0 to 10, and 0 to 12 body areas.
- Daily entries require `localDate` using `YYYY-MM-DD`.
- Timed entries require `severity` from 1 to 10.
- Timed entries require `symptoms`, an array with 1 to 12 items.
- Timed entries require `bodyAreas`, an array with 0 to 12 items.
- Timed entries require `occurredAt`, which must be a valid date.
- Timed `durationMinutes`, when present, must be a number from 1 to 1440.
- `notes`, when present, must be a string at most 1000 characters.

Client validation:

- Day-mode save is available after the date and condition assessments are present.
- Timed save is disabled while no skin symptom is selected.
- Daily save success message: "Skin day saved."
- Timed save success message: "Skin observation saved."

## Recent Entries

The Recent list combines meals, GI events, and skin entries from the live subscription windows.

Behavior:

- Sort by `eatenAt` for meals, `occurredAt` for GI events, and `sortAt` for skin entries, newest first.
- Show an empty state when no subscribed entries exist.
- Entry actions expose pending states where applicable.
- Action success and failure messages appear above the list.

Meal recent entry content:

- Meal analysis name.
- Relative time.
- Interpreted meal text.
- Up to the first 3 irritant names.
- Reanalyze action.
- Single-meal JSON export action.
- Delete action.

GI event recent entry content:

- Severity.
- Relative time.
- Symptoms and stool type details.
- Delete action.

Skin recent entry content:

- `Skin day` or `Skin observation`.
- Severity.
- Local date for daily entries or relative time for timed observations.
- Skin symptoms and body area details.
- Delete action.

GI event detail text is a comma-separated list of symptoms plus `stool type N` when present. If no details exist, it displays "No details recorded", although current validation prevents newly created records from having no details.

## Delete Behavior

Meals, GI events, and skin entries can be deleted from Recent.

Behavior:

- Deletion asks for confirmation: "Delete this meal? This cannot be undone.", "Delete this event? This cannot be undone.", or "Delete this skin entry? This cannot be undone."
- Canceling confirmation performs no delete.
- The pending delete state is scoped to one entry.
- Only the authenticated owner can delete their own meal, GI event, or skin entry.
- Successful meal deletion shows "Meal deleted."
- Successful event deletion shows "Event deleted."
- Successful skin deletion shows "Skin entry deleted."
- Failed deletion shows an error message.

Deleting a meal, GI event, or skin entry does not automatically rerun correlation analysis. The displayed current analysis remains whatever is stored until a manual or scheduled analysis run updates it.

## Stats Summary

The stats summary shows:

- Meals: count of currently subscribed meals, up to 25.
- GI: count of currently subscribed GI events, up to 25.
- Skin: count of currently subscribed skin entries, up to 25.
- Signal:
  - If current analysis exists, the most frequent irritant name across subscribed meals' analyses.
  - If no irritants are present, `None`.
  - If no current analysis exists, `Pending`.

The Signal stat depends on subscribed meal data and the presence of an analysis document. It is not necessarily the top finding from the stored correlation analysis.

## Correlation Analysis

Users can manually run correlation analysis from the Analysis view. The backend also runs a scheduled weekly sweep.

Manual behavior:

- Requires authenticated user.
- Calls the correlation analysis backend.
- Shows "Analysis queued." when the callable completes.
- Current analysis updates through the live analysis subscription.
- Failure shows a user-visible error.

Scheduled behavior:

- Runs every Monday at 03:00 in the America/Denver timezone.
- Processes up to 100 user profiles per sweep.
- Logs per-user failures and continues.

Analysis input:

- Up to 200 most recent meals ordered by `eatenAt` descending.
- Up to 200 most recent GI events ordered by `occurredAt` descending.
- Meal payload includes ID, eaten-at timestamp, meal name, foods, irritants, and notes.
- Event payload includes ID, occurred-at timestamp, severity, symptoms, notes, stool type, and duration.

Insufficient data behavior:

- If there are no meals or no events, analysis status is `insufficient_data`.
- Summary: "Add meals and GI events before running correlation analysis."
- Findings are empty.
- Data quality note: "At least one meal and one GI event are required."
- The insufficient analysis is saved as the current analysis and as a historical run.

Successful analysis output:

- Status: `ready`, `insufficient_data`, or `failed` in the data model. Current normalization produces `ready` or `insufficient_data`.
- Generated-at timestamp.
- Meal count.
- Event count.
- Summary.
- Findings.
- Data quality notes.

Findings contain:

- Irritant.
- Confidence from 0 to 1.
- Direction: `possible_trigger`, `unlikely_trigger`, or `insufficient_data`.
- Time window in hours, clamped from 1 to 120.
- Evidence.
- Suggested action.

Generated correlation analysis is normalized:

- Findings are limited to 12.
- Irritant is limited to 100 characters.
- Confidence is clamped from 0 to 1.
- Invalid direction becomes `insufficient_data`.
- Evidence is limited to 500 characters.
- Suggested action is limited to 300 characters.
- Summary is limited to 800 characters.
- Data quality notes are limited to 8 notes, 240 characters each.

Each analysis run is saved twice:

- `analyses/current`, replacing the current analysis.
- A new generated analysis document, preserving a historical run.

Clients can read analyses but cannot create, update, or delete them directly.

## Deterministic Sensitivity Scoring

Before AI correlation analysis, the backend computes deterministic irritant sensitivity rankings. These rankings inform the prompt and power the heuristic fallback.

Rules:

- Only meals with status `analyzed` are considered.
- A meal must have a valid eaten-at time and extracted irritants.
- Events must have valid occurred-at time and severity from 1 to 10.
- Events before a meal are ignored.
- Events more than 120 hours after a meal are ignored.
- Events closer to the meal have more influence using a 24-hour half-life.
- Scores are normalized per irritant exposure count so frequent foods do not rank high only because they appear often.
- Results sort by normalized sensitivity descending, then weighted symptom score descending, then irritant name.
- Scores round to 3 decimal places internally.

Irritant extraction supports these analysis fields:

- `irritants`.
- `allergens`.
- `allergenTags`.
- `fodmaps`.
- `fodmap`.
- `fodmapTags`.
- `fodmapRelatedTags`.
- `tags`.
- Nested categorized objects where category is allergen/allergens/fodmap/fodmaps.

The sensitivity context includes:

- Overall top 12 sensitivity scores.
- Per-symptom top 8 scores for up to 8 distinct normalized symptom tags.
- An explanation that these are exploratory associations, not causation.

The AI prompt is instructed to use these rankings but not expose raw scores, formulas, or calculation output.

## Correlation Fallback

If Gemini is unavailable or fails during correlation analysis, the backend saves a heuristic correlation analysis.

Heuristic behavior:

- Uses deterministic sensitivity rankings.
- Takes up to 8 findings.
- Confidence is normalized sensitivity divided by 10, clamped from 0.1 to 0.8.
- Direction is `possible_trigger` when normalized sensitivity is greater than 0, otherwise `insufficient_data`.
- Window is 120 hours.
- Evidence states that the irritant ranked higher in a time-weighted association pass and is associated with symptoms, not causal.
- Suggested action is to keep logging consistently before making diet changes.
- If findings exist, status is `ready`; otherwise `insufficient_data`.
- Data quality notes state that heuristic analysis was used because Gemini was unavailable or unconfigured, and that consistent timing improves confidence.

## Analysis Display

When no current analysis exists, the Analysis view shows:

- Meal count from the current meal subscription.
- GI event count from the current event subscription.
- Empty state titled "No analysis yet".

When analysis exists, the Analysis view shows:

- Last generated timestamp.
- Summary.
- Meal and event counts from the analysis record.
- Each finding with irritant, direction label, window, confidence percentage, evidence, and suggested action.
- Data quality notes when present.

For display, `possible_trigger` is labeled as "possible sensitivity". Other directions replace underscores with spaces.

## Export Behavior

Exports are downloaded as local files on the client.

Single meal JSON export:

- Available from each meal in Recent.
- File name pattern: `meal-signal-meal-{slug}-{yyyy-mm-dd}.json`.
- Slug comes from meal name or meal ID, lowercased, non-alphanumeric runs replaced with hyphens, trimmed, max 80 characters, defaulting to `meal`.
- Payload includes `exportedAt` and `meal`.
- Meal date fields serialize as ISO strings.

All meals JSON export:

- Available from Analysis view.
- Fetches all meals for the user ordered by `eatenAt` descending.
- File name pattern: `meal-signal-meals-{yyyy-mm-dd}.json`.
- Payload includes `exportedAt`, `mealCount`, and `meals`.

Analysis JSON export:

- Available from Analysis view.
- Fetches all meals, GI events, and skin entries.
- File name pattern: `meal-signal-analysis-{yyyy-mm-dd}.json`.
- Payload includes `exportedAt`, `analysis`, `meals`, `giEvents`, and `skinEntries`.
- `analysis` is `null` if no analysis exists.
- All date fields serialize as ISO strings.

Analysis HTML export:

- Available from Analysis view.
- Fetches all meals, GI events, and skin entries.
- File name pattern: `meal-signal-analysis-{yyyy-mm-dd}.html`.
- Includes export timestamp and analysis generated timestamp when present.
- Includes summary.
- States that the current correlation analysis remains GI-focused and skin entries are exported as tracked context only.
- Includes all findings or "No findings available."
- Includes data notes or "No data quality notes."
- Includes a Recent Meals table using up to the first 50 meals from the all-meals query.
- Includes a Recent GI Events table using up to the first 50 events from the all-events query.
- Includes a Recent Skin Entries table using up to the first 50 skin entries from the all-skin-entries query.
- Escapes HTML content from records before writing the file.
- Uses a print-friendly static HTML layout.

Export failure shows an error message. Export buttons disable while an export is being prepared.

## Data Model

### Meal

Fields:

- `id`: document ID.
- `uid`: owner UID.
- `inputMode`: `text`, `voice`, or `image`.
- `rawInput`: submitted text or media marker such as `[voice:audio/webm]`.
- `interpretedText`: text used for display and downstream analysis.
- `eatenAt`: meal timestamp.
- `notes`: optional note.
- `status`: `analyzed`, `needs_review`, or `failed`.
- `analysis`: meal analysis object.
- `createdAt`: creation timestamp.
- `updatedAt`: update timestamp.
- `reanalyzedAt`: optional reanalysis timestamp.

Client fallback parsing:

- Missing `rawInput` becomes empty string.
- Missing `interpretedText` becomes empty string.
- Missing `status` becomes `needs_review`.
- Missing `analysis` becomes a default meal analysis with meal name `Meal`, empty foods, empty irritants, and empty summary.
- Missing or invalid dates fall back to the current date on the client.

### GI Event

Fields:

- `id`: document ID.
- `uid`: owner UID.
- `occurredAt`: event timestamp.
- `severity`: number.
- `symptoms`: string list.
- `notes`: optional note.
- `stoolType`: optional number.
- `durationMinutes`: optional number.
- `createdAt`: creation timestamp.

Client fallback parsing:

- Missing severity becomes 1.
- Invalid or missing symptoms become an empty list.
- Missing or invalid dates fall back to the current date on the client.

### Skin Entry

Fields:

- `id`: document ID.
- `uid`: owner UID.
- `entryType`: `daily` or `timed`.
- `conditions`: daily condition assessments.
- `severity`: timed observation severity.
- `symptoms`: timed observation symptom list.
- `bodyAreas`: timed observation body area list.
- `notes`: optional note.
- `durationMinutes`: optional timed observation duration.
- `localDate`: daily entry local date.
- `occurredAt`: timed entry timestamp.
- `sortAt`: ordering timestamp.
- `createdAt`: creation timestamp.
- `updatedAt`: update timestamp.

Client fallback parsing:

- Missing timed severity becomes unset on the client and timed edit defaults to 4.
- Invalid or missing symptoms, body areas, and conditions become empty lists.
- Missing or invalid dates fall back to the current date on the client.

### Correlation Analysis

Fields:

- `id`: document ID.
- `uid`: owner UID.
- `status`: `ready`, `insufficient_data`, or `failed`.
- `generatedAt`: timestamp.
- `mealCount`: number.
- `eventCount`: number.
- `summary`: string.
- `findings`: finding list.
- `dataQualityNotes`: string list.

Client fallback parsing:

- Missing status becomes `insufficient_data`.
- Missing meal count becomes 0.
- Missing event count becomes 0.
- Missing summary becomes "No analysis has been generated yet."
- Missing findings become an empty list.
- Invalid data quality notes become an empty list.
- Missing or invalid generated date falls back to the current date on the client.

## Data Ownership and Security

- All user data lives under `users/{uid}`.
- A user can only read their own profile, meals, events, and analyses.
- A user can create and update their own profile if the profile is valid and UID matches.
- Profile UID is immutable.
- Profile `createdAt` is immutable on update.
- A user can create and update their own meals if the meal document is valid and UID matches.
- Meal UID is immutable.
- Meal `createdAt` is immutable on update.
- A user can delete their own meals.
- A user can create and update their own GI events if the event document is valid and UID matches.
- GI event UID is immutable.
- GI event `createdAt` is immutable on update.
- A user can delete their own GI events.
- Clients cannot write analyses.
- All other reads and writes are denied.

Although rules allow valid client-side creates and updates for meals and events, the current product write flows create meals and GI events through callable backend functions. Deletion is currently client-side direct Firestore delete.

## Backend Callable Functions

All callable functions require authentication.

### createMeal

- Region: us-central1.
- Timeout: 120 seconds.
- Memory: 512 MiB.
- Requires Gemini secret access for AI paths.
- Validates input mode.
- Validates eaten-at date.
- Validates optional notes.
- Text mode requires text.
- Media modes require base64 media and MIME type.
- Saves meal under the authenticated user's meals collection.
- Ensures a user profile exists or is updated.
- Returns the created meal with serialized timestamps.

### createGiEvent

- Validates event fields.
- Saves event under the authenticated user's events collection.
- Ensures a user profile exists or is updated.
- Returns the created event with serialized timestamps.

### saveSkinEntry

- Validates skin entry fields.
- Saves daily entries under the authenticated user's `skinEntries` collection using `daily_YYYY-MM-DD`.
- Saves timed entries under the authenticated user's `skinEntries` collection using generated document IDs.
- Ensures a user profile exists or is updated.
- Returns the saved skin entry with serialized timestamps.

### reanalyzeMeal

- Region: us-central1.
- Timeout: 120 seconds.
- Memory: 512 MiB.
- Requires Gemini secret access.
- Validates meal ID.
- Reads the authenticated user's meal.
- Reanalyzes from text.
- Updates analysis and timestamps.
- Returns the updated meal with serialized timestamps.

### analyzeCorrelations

- Region: us-central1.
- Timeout: 180 seconds.
- Memory: 512 MiB.
- Requires Gemini secret access.
- Runs correlation analysis for the authenticated user.
- Saves current and historical analysis documents.
- Returns the analysis with serialized timestamps.

### weeklyCorrelationSweep

- Scheduled for every Monday at 03:00 America/Denver.
- Timeout: 540 seconds.
- Memory: 512 MiB.
- Requires Gemini secret access.
- Runs correlation analysis for up to 100 users.

## AI and Prompt Configuration

The backend uses Gemini through server-side functions. Client apps do not call Gemini directly.

Default model configuration:

- Meal analysis model: `gemini-2.5-flash-lite`.
- Correlation analysis model: `gemini-3.1-pro-preview`.

Prompt and model settings can be overridden by Remote Config:

- `gemini_model_name`.
- `correlation_analysis_model_name`.
- `meal_analysis_prompt_template`.
- `correlation_analysis_prompt_template`.
- `media_meal_audio_instruction`.
- `media_meal_image_instruction`.

Remote Config behavior:

- Successful Remote Config values are cached in memory for 5 minutes.
- If Remote Config fetch fails, checked-in defaults are used and cached for 1 minute.
- Templates use placeholders such as `{{input}}`, `{{mealsJson}}`, `{{eventsJson}}`, `{{sensitivityExplanation}}`, and `{{sensitivityJson}}`.

Gemini generation behavior:

- Requests ask for JSON responses.
- Temperature is 0.2.
- Max output tokens is 4096.
- JSON responses may be wrapped in a JSON code fence; parsing removes that wrapper.

## Error Handling

The app maps known auth, function, and Firestore errors to user-friendly messages:

- Email already in use: "An account already exists for that email address."
- Invalid credential: "Email or password is incorrect."
- Invalid email: "Enter a valid email address."
- Google popup closed: "Google sign-in was closed before it finished."
- Too many auth attempts: "Too many attempts. Wait a few minutes and try again."
- Weak password: "Use a password with at least 6 characters."
- Function failed precondition: "The request cannot be completed yet."
- Function invalid argument: "Some submitted information is invalid."
- Function not found: "The requested record was not found."
- Function permission denied: "You do not have access to that record."
- Function resource exhausted: "The request is too large or the service is busy."
- Function unauthenticated: "Sign in before making changes."
- Firestore permission denied: "You do not have access to this data."
- Service unavailable: "The service is temporarily unavailable. Try again shortly."

Unknown Firebase errors use the Firebase error message when available. Other errors use their error message when available, otherwise a feature-specific fallback.

Route-level rendering failures show a generic "Something went wrong" state with a retry action.

Unknown routes show a "Page not found" state with a return-home action.

## PWA and Offline Behavior

The web app is installable as a PWA.

Manifest behavior:

- App name and short name: Meal Signal.
- Start URL: `/`.
- Scope: `/`.
- Display mode: standalone.
- Includes favicon, standard icons, maskable icon, and Apple touch icon.

Service worker behavior:

- Registers only in production.
- Registers at `/sw.js` with scope `/`.
- Uses `updateViaCache: none`.
- Cache version is `meal-signal-v2`.
- Pre-caches app shell assets: `/`, `/offline.html`, `/favicon.ico`, `/manifest.webmanifest`, `/icon-192.png`, `/icon-512.png`, and `/icon-maskable-512.png`.
- Deletes caches that do not start with the current cache version on activation.
- Claims clients after activation.
- Handles only GET requests from the same origin.
- For navigation requests, tries network first, updates the cached `/` response on success, and falls back to the requested cached page, cached `/`, or `/offline.html`.
- For static assets under `/_next/static/` and listed app shell assets, uses cache-first behavior.

Privacy boundary:

- The service worker intentionally does not cache Firebase responses or private meal, event, or analysis records.
- There is no offline write queue.
- There is no background sync.
- There is no offline persistence for private tracking data.

## Privacy, Indexing, and Public Metadata

- The app is private and authenticated.
- The site is marked noindex and nofollow in metadata.
- `robots.txt` disallows all user agents from all paths.
- Metadata identifies the app as a health category app.
- Telephone, date, address, and email auto-detection are disabled in metadata.
- The app supports light and dark color schemes based on system preference.
- The app has no in-app theme toggle.

## Browser and Device Permissions

- The web app requests microphone access only when the user starts voice recording.
- Camera access is requested by the browser or OS only through the image file/capture flow.
- Security headers permit camera and microphone for same-origin use.
- Security headers disallow geolocation, payment, USB, and browsing-topics permissions.
- The app sets `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.

## App Check Status

Firebase App Check is not currently enabled.

Current boundary:

- Do not enable Firestore App Check enforcement until the production client initializes App Check and valid traffic is confirmed.
- Do not enable callable-function App Check enforcement until the deployed client sends valid App Check tokens.
- Do not commit or share debug tokens.

## Current Explicit Non-Features

These are not implemented in the current web app and should not be assumed for a Swift app unless intentionally added:

- Editing existing meals.
- Editing existing GI events.
- Deleting user profiles or accounts.
- Viewing historical analysis runs beyond the current analysis document.
- Search, filtering, or pagination of meal/event history.
- Offline private data cache.
- Offline meal or event creation.
- Background sync.
- Push notifications.
- App Check enforcement.
- Direct client access to Gemini or any AI provider.
- Medical recommendations or diagnostic claims.

## Platform Parity Notes for Future Clients

A future Swift app should preserve these behavioral contracts:

- Auth-gated private tracking.
- Per-user data ownership by auth UID.
- Meal creation through backend callable behavior, including AI and heuristic fallbacks.
- GI event creation rules, especially stool-type-only validity.
- Live or fresh display of recent meals, GI events, and current analysis.
- Manual analysis trigger plus awareness that weekly scheduled analysis may update current analysis.
- Owner-only meal and GI event deletes.
- Reanalysis from stored interpreted/raw text, not retained original media.
- Export semantics if export is implemented on the native client.
- No local caching of private tracking records unless this privacy/product decision changes.
- Cautious, non-medical analysis language.
