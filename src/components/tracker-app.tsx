"use client";

import {
  Activity,
  BarChart3,
  CalendarClock,
  Camera,
  Check,
  ChevronRight,
  CircleAlert,
  LogOut,
  Mail,
  Mic,
  Plus,
  RefreshCcw,
  Utensils,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import { auth, hasFirebaseConfig } from "@/lib/firebase";
import {
  ensureUserProfile,
  subscribeCurrentAnalysis,
  subscribeGiEvents,
  subscribeMeals,
} from "@/lib/firestore";
import { analyzeCorrelations, createGiEvent, createMeal, reanalyzeMeal } from "@/lib/callables";
import { formatRelativeTime, toDatetimeLocalValue } from "@/lib/date";
import type { CorrelationAnalysis, GiEvent, InputMode, Meal } from "@/lib/types";

const symptomOptions = [
  "cramping",
  "bloating",
  "reflux",
  "nausea",
  "diarrhea",
  "constipation",
  "gas",
  "pain",
];

type View = "log" | "analysis";

export function TrackerApp() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [view, setView] = useState<View>("log");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [events, setEvents] = useState<GiEvent[]>([]);
  const [analysis, setAnalysis] = useState<CorrelationAnalysis | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      if (currentUser) await ensureUserProfile(currentUser);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribeMeals = subscribeMeals(user.uid, setMeals);
    const unsubscribeEvents = subscribeGiEvents(user.uid, setEvents);
    const unsubscribeAnalysis = subscribeCurrentAnalysis(user.uid, setAnalysis);

    return () => {
      unsubscribeMeals();
      unsubscribeEvents();
      unsubscribeAnalysis();
    };
  }, [user]);

  if (!hasFirebaseConfig) return <ConfigMissing />;
  if (!authReady) return <LoadingScreen />;
  if (!user) return <AuthScreen />;

  return (
    <main className="min-h-screen bg-[#f7f8f3] text-stone-950">
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#f7f8f3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-950 text-white">
              <Utensils size={19} aria-hidden />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold">Meal Signal</h1>
              <p className="truncate text-sm text-stone-500">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="grid size-10 place-items-center rounded-lg border border-stone-300 bg-white text-stone-700 shadow-sm transition hover:border-stone-400"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={18} aria-hidden />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0">
          <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-stone-200 bg-white p-1 shadow-sm">
            <TabButton active={view === "log"} onClick={() => setView("log")} icon={<Plus size={17} />}>
              Log
            </TabButton>
            <TabButton
              active={view === "analysis"}
              onClick={() => setView("analysis")}
              icon={<BarChart3 size={17} />}
            >
              Analysis
            </TabButton>
          </div>

          {view === "log" ? (
            <div className="grid gap-5">
              <MealComposer />
              <GiEventForm />
            </div>
          ) : (
            <AnalysisPanel analysis={analysis} mealCount={meals.length} eventCount={events.length} />
          )}
        </section>

        <aside className="grid content-start gap-5">
          <StatsStrip meals={meals} events={events} analysis={analysis} />
          <RecentEntries meals={meals} events={events} />
        </aside>
      </div>
    </main>
  );
}

function TabButton({
  active,
  children,
  icon,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition ${
        active ? "bg-emerald-950 text-white shadow-sm" : "text-stone-600 hover:bg-stone-100"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function AuthScreen() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  async function signInWithGoogle() {
    setBusy(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f3] px-4 text-stone-950">
      <section className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-lg bg-emerald-950 text-white">
            <Utensils size={20} aria-hidden />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Meal Signal</h1>
            <p className="text-sm text-stone-500">Private meal and symptom tracking</p>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={submit}>
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Email
            <span className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={17}
                aria-hidden
              />
              <input
                className="h-11 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </span>
          </label>

          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Password
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
            <ChevronRight size={17} aria-hidden />
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs font-medium uppercase text-stone-400">
          <span className="h-px flex-1 bg-stone-200" />
          Or
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={busy}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue with Google
          <ChevronRight size={17} aria-hidden />
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm font-medium text-emerald-950"
        >
          {mode === "signin" ? "Create a new account" : "Sign in instead"}
        </button>
      </section>
    </main>
  );
}

function MealComposer() {
  const [mode, setMode] = useState<InputMode>("text");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [eatenAt, setEatenAt] = useState(toDatetimeLocalValue(new Date()));
  const [mediaBase64, setMediaBase64] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      await createMeal({
        mode,
        text: mode === "text" ? text : undefined,
        mediaBase64: mode === "text" ? undefined : mediaBase64,
        mimeType: mode === "text" ? undefined : mimeType,
        eatenAt: new Date(eatenAt).toISOString(),
        notes: notes.trim() || undefined,
      });
      setText("");
      setNotes("");
      setMediaBase64("");
      setMimeType("");
      setEatenAt(toDatetimeLocalValue(new Date()));
      setMessage("Meal saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Meal could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  async function onFileChange(file?: File) {
    if (!file) return;
    const base64 = await fileToBase64(file);
    setMediaBase64(base64);
    setMimeType(file.type);
  }

  async function toggleRecording() {
    if (recording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunksRef.current.push(event.data);
    };
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
      setMediaBase64(await blobToBase64(blob));
      setMimeType(blob.type);
      stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    };
    recorder.start();
    setRecording(true);
  }

  const canSubmit =
    mode === "text" ? text.trim().length > 2 : mediaBase64.length > 0 && mimeType.length > 0;

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Meal</h2>
          <p className="text-sm text-stone-500">Capture what you ate and when.</p>
        </div>
        <Utensils className="mt-1 text-emerald-950" size={20} aria-hidden />
      </div>

      <form className="grid gap-4" onSubmit={submit}>
        <div className="grid grid-cols-3 gap-2">
          <ModeButton active={mode === "text"} onClick={() => setMode("text")} icon={<Utensils size={17} />}>
            Text
          </ModeButton>
          <ModeButton active={mode === "voice"} onClick={() => setMode("voice")} icon={<Mic size={17} />}>
            Voice
          </ModeButton>
          <ModeButton active={mode === "image"} onClick={() => setMode("image")} icon={<Camera size={17} />}>
            Image
          </ModeButton>
        </div>

        {mode === "text" ? (
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Meal text
            <textarea
              className="min-h-28 rounded-lg border border-stone-300 bg-white px-3 py-2 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Turkey sandwich, chips, iced coffee"
            />
          </label>
        ) : mode === "voice" ? (
          <div className="grid gap-3 rounded-lg border border-stone-200 bg-stone-50 p-3">
            <button
              type="button"
              onClick={toggleRecording}
              className={`flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
                recording
                  ? "bg-red-700 text-white hover:bg-red-800"
                  : "bg-emerald-950 text-white hover:bg-emerald-900"
              }`}
            >
              <Mic size={18} aria-hidden />
              {recording ? "Stop recording" : mediaBase64 ? "Record again" : "Record"}
            </button>
            <MediaReady ready={Boolean(mediaBase64)} label="Audio ready" />
          </div>
        ) : (
          <label className="grid gap-3 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 text-sm font-medium text-stone-700">
            <span className="flex items-center gap-2">
              <Camera size={18} aria-hidden />
              Meal photo
            </span>
            <input
              className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(event) => onFileChange(event.target.files?.[0])}
            />
            <MediaReady ready={Boolean(mediaBase64)} label="Image ready" />
          </label>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Eaten at
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="datetime-local"
              value={eatenAt}
              onChange={(event) => setEatenAt(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Notes
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Portion, stress, meds"
            />
          </label>
        </div>

        <SubmitRow busy={busy} disabled={!canSubmit || busy} message={message} label="Save meal" />
      </form>
    </section>
  );
}

function GiEventForm() {
  const [occurredAt, setOccurredAt] = useState(toDatetimeLocalValue(new Date()));
  const [severity, setSeverity] = useState(4);
  const [symptoms, setSymptoms] = useState<string[]>(["bloating"]);
  const [notes, setNotes] = useState("");
  const [stoolType, setStoolType] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  function toggleSymptom(symptom: string) {
    setSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom],
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      await createGiEvent({
        occurredAt: new Date(occurredAt).toISOString(),
        severity,
        symptoms,
        notes: notes.trim() || undefined,
        stoolType: stoolType ? Number(stoolType) : undefined,
        durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
      });
      setOccurredAt(toDatetimeLocalValue(new Date()));
      setSeverity(4);
      setSymptoms(["bloating"]);
      setNotes("");
      setStoolType("");
      setDurationMinutes("");
      setMessage("Event saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Event could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">GI event</h2>
          <p className="text-sm text-stone-500">Record timing, severity, and symptoms.</p>
        </div>
        <Activity className="mt-1 text-emerald-950" size={20} aria-hidden />
      </div>

      <form className="grid gap-4" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Occurred at
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="datetime-local"
              value={occurredAt}
              onChange={(event) => setOccurredAt(event.target.value)}
              required
            />
          </label>

          <label className="grid gap-1 text-sm font-medium text-stone-700">
            Severity: {severity}
            <input
              className="h-11 accent-emerald-950"
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(event) => setSeverity(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">Symptoms</span>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map((symptom) => (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`h-9 rounded-md border px-3 text-sm font-medium transition ${
                  symptoms.includes(symptom)
                    ? "border-emerald-950 bg-emerald-950 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-1">
            Stool type
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="number"
              min="1"
              max="7"
              value={stoolType}
              onChange={(event) => setStoolType(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-1">
            Minutes
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              type="number"
              min="1"
              max="1440"
              value={durationMinutes}
              onChange={(event) => setDurationMinutes(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-1">
            Notes
            <input
              className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-900/15"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
        </div>

        <SubmitRow busy={busy} disabled={symptoms.length === 0 || busy} message={message} label="Save event" />
      </form>
    </section>
  );
}

function AnalysisPanel({
  analysis,
  mealCount,
  eventCount,
}: {
  analysis: CorrelationAnalysis | null;
  mealCount: number;
  eventCount: number;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function runAnalysis() {
    setBusy(true);
    setMessage("");
    try {
      await analyzeCorrelations();
      setMessage("Analysis queued.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Analysis could not be started.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Correlation analysis</h2>
          <p className="text-sm text-stone-500">
            {analysis
              ? `Updated ${analysis.generatedAt.toLocaleString()}`
              : `${mealCount} meals and ${eventCount} GI events available`}
          </p>
        </div>
        <button
          type="button"
          onClick={runAnalysis}
          disabled={busy}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw size={16} className={busy ? "animate-spin" : ""} aria-hidden />
          {busy ? "Starting" : "Run"}
        </button>
      </div>

      {message ? <p className="mb-4 rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-700">{message}</p> : null}

      {analysis ? (
        <div className="grid gap-4">
          <div className="rounded-lg bg-[#eef5ee] p-4">
            <p className="text-sm font-medium text-emerald-950">{analysis.summary}</p>
            <p className="mt-2 text-xs text-stone-600">
              {analysis.mealCount} meals, {analysis.eventCount} GI events
            </p>
          </div>

          <div className="grid gap-3">
            {analysis.findings.map((finding) => (
              <article key={`${finding.irritant}-${finding.windowHours}`} className="rounded-lg border border-stone-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{finding.irritant}</h3>
                    <p className="text-sm text-stone-500">
                      {finding.direction.replaceAll("_", " ")} within {finding.windowHours}h
                    </p>
                  </div>
                  <span className="rounded-md bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-700">
                    {Math.round(finding.confidence * 100)}%
                  </span>
                </div>
                <p className="mt-3 text-sm text-stone-700">{finding.evidence}</p>
                <p className="mt-2 text-sm font-medium text-emerald-950">{finding.suggestedAction}</p>
              </article>
            ))}
          </div>

          {analysis.dataQualityNotes.length ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
                <CircleAlert size={16} aria-hidden />
                Data notes
              </div>
              <ul className="grid gap-1 text-sm text-amber-900">
                {analysis.dataQualityNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyState icon={<BarChart3 size={22} />} title="No analysis yet" />
      )}
    </section>
  );
}

function StatsStrip({
  meals,
  events,
  analysis,
}: {
  meals: Meal[];
  events: GiEvent[];
  analysis: CorrelationAnalysis | null;
}) {
  const topIrritant = useMemo(() => {
    const counts = new Map<string, number>();
    for (const meal of meals) {
      for (const irritant of meal.analysis.irritants ?? []) {
        counts.set(irritant.name, (counts.get(irritant.name) ?? 0) + 1);
      }
    }

    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None";
  }, [meals]);

  return (
    <section className="grid grid-cols-3 gap-2">
      <Stat icon={<Utensils size={17} />} label="Meals" value={meals.length.toString()} />
      <Stat icon={<Activity size={17} />} label="Events" value={events.length.toString()} />
      <Stat icon={<BarChart3 size={17} />} label="Signal" value={analysis ? topIrritant : "Pending"} />
    </section>
  );
}

function RecentEntries({ meals, events }: { meals: Meal[]; events: GiEvent[] }) {
  const [reanalyzingMealId, setReanalyzingMealId] = useState("");
  const [message, setMessage] = useState("");
  const combined = [
    ...meals.map((meal) => ({ kind: "meal" as const, date: meal.eatenAt, meal })),
    ...events.map((event) => ({ kind: "event" as const, date: event.occurredAt, event })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 12);

  async function redoMealAnalysis(mealId: string) {
    setReanalyzingMealId(mealId);
    setMessage("");

    try {
      await reanalyzeMeal(mealId);
      setMessage("Meal analysis refreshed.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Meal analysis could not be refreshed.");
    } finally {
      setReanalyzingMealId("");
    }
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <CalendarClock size={18} className="text-emerald-950" aria-hidden />
        <h2 className="font-semibold">Recent</h2>
      </div>
      {message ? <p className="mb-3 rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-700">{message}</p> : null}
      {combined.length ? (
        <div className="grid gap-3">
          {combined.map((item) =>
            item.kind === "meal" ? (
              <article key={`meal-${item.meal.id}`} className="rounded-lg bg-stone-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">{item.meal.analysis.mealName}</h3>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => redoMealAnalysis(item.meal.id)}
                      disabled={reanalyzingMealId === item.meal.id}
                      className="grid size-7 place-items-center rounded-md border border-stone-300 bg-white text-stone-600 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Redo meal analysis"
                      title="Redo meal analysis"
                    >
                      <RefreshCcw
                        size={14}
                        className={reanalyzingMealId === item.meal.id ? "animate-spin" : ""}
                        aria-hidden
                      />
                    </button>
                    <span className="text-xs text-stone-500">{formatRelativeTime(item.date)}</span>
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-stone-600">{item.meal.interpretedText}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.meal.analysis.irritants.slice(0, 3).map((irritant) => (
                    <span
                      key={`${item.meal.id}-${irritant.name}`}
                      className="rounded bg-white px-2 py-1 text-xs font-medium text-stone-600"
                    >
                      {irritant.name}
                    </span>
                  ))}
                </div>
              </article>
            ) : (
              <article key={`event-${item.event.id}`} className="rounded-lg bg-stone-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">Severity {item.event.severity}</h3>
                  <span className="shrink-0 text-xs text-stone-500">{formatRelativeTime(item.date)}</span>
                </div>
                <p className="mt-1 text-sm text-stone-600">{item.event.symptoms.join(", ")}</p>
              </article>
            ),
          )}
        </div>
      ) : (
        <EmptyState icon={<CalendarClock size={22} />} title="No entries yet" />
      )}
    </section>
  );
}

function ModeButton({
  active,
  children,
  icon,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition ${
        active
          ? "border-emerald-950 bg-emerald-950 text-white"
          : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function SubmitRow({
  busy,
  disabled,
  label,
  message,
}: {
  busy: boolean;
  disabled: boolean;
  label: string;
  message: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="submit"
        disabled={disabled}
        className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Saving..." : label}
        {busy ? <RefreshCcw className="animate-spin" size={16} aria-hidden /> : <Check size={16} aria-hidden />}
      </button>
      {message ? <p className="text-sm text-stone-600">{message}</p> : null}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
      <div className="mb-2 text-emerald-950">{icon}</div>
      <p className="truncate text-xs font-medium uppercase text-stone-500">{label}</p>
      <p className="truncate text-lg font-semibold">{value}</p>
    </div>
  );
}

function MediaReady({ ready, label }: { ready: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${ready ? "text-emerald-900" : "text-stone-500"}`}>
      {ready ? <Check size={16} aria-hidden /> : <CircleAlert size={16} aria-hidden />}
      {ready ? label : "No media selected"}
    </div>
  );
}

function EmptyState({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-stone-300 p-8 text-center text-stone-500">
      <div className="mb-2 text-stone-400">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}

function LoadingScreen() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f3] text-stone-600">
      <RefreshCcw className="animate-spin" size={22} aria-label="Loading" />
    </main>
  );
}

function ConfigMissing() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f3] px-4 text-stone-950">
      <section className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <h1 className="mb-2 text-lg font-semibold">Firebase config missing</h1>
        <p className="text-sm text-stone-600">
          Add the Firebase Web App values to `.env.local` or App Hosting build
          environment variables.
        </p>
      </section>
    </main>
  );
}

function fileToBase64(file: File) {
  return blobToBase64(file);
}

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result ?? "");
      resolve(value.includes(",") ? value.split(",")[1] : value);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
