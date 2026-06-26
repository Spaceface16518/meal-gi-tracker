import { BarChart3, LogOut, Plus, Utensils } from "lucide-solid";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  Show,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import type { JSX } from "solid-js";
import { A, useLocation, useParams } from "@solidjs/router";
import { AuthScreen } from "@/components/tracker/auth-screen";
import { GiEventForm } from "@/components/tracker/gi-event-form";
import { MealComposer } from "@/components/tracker/meal-composer";
import { SkinEntryForm } from "@/components/tracker/skin-entry-form";
import { AnalysisPanel } from "@/components/tracker/analysis-panel";
import { EntryDetailPage, type RecentEntry } from "@/components/tracker/entry-detail-page";
import { RecentEntries, StatsStrip } from "@/components/tracker/sidebar";
import { ConfigMissing, EmptyState, LoadingScreen, StatusMessage } from "@/components/tracker/ui";
import { auth, hasFirebaseConfig } from "@/lib/firebase";
import { demoReadOnlyMessage, isDemoUser } from "@/lib/demo";
import { getErrorMessage } from "@/lib/errors";
import {
  ensureUserProfile,
  subscribeCurrentAnalysis,
  subscribeGiEvents,
  subscribeMeals,
  subscribeSkinEntries,
} from "@/lib/firestore";
import type { CorrelationAnalysis, GiEvent, Meal, SkinEntry } from "@/lib/types";

type TrackerContextValue = {
  user: () => User;
  readOnly: () => boolean;
  meals: () => Meal[];
  events: () => GiEvent[];
  skinEntries: () => SkinEntry[];
  analysis: () => CorrelationAnalysis | null;
};

const TrackerContext = createContext<TrackerContextValue>();

function useTrackerContext() {
  const context = useContext(TrackerContext);
  if (!context) throw new Error("Tracker routes must be rendered inside TrackerApp.");
  return context;
}

function NavLink(props: { href: string; icon: JSX.Element; children: JSX.Element }) {
  const location = useLocation();
  const active = () =>
    props.href === "/" ? location.pathname === "/" : location.pathname.startsWith(props.href);

  return (
    <A
      href={props.href}
      classList={{
        "flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition": true,
        "bg-brand text-background shadow-sm": active(),
        "text-muted-strong hover:bg-surface-muted": !active(),
      }}
    >
      {props.icon}
      {props.children}
    </A>
  );
}

export function TrackerApp(props: { children?: JSX.Element }) {
  const [user, setUser] = createSignal<User | null>(auth.currentUser);
  const [authReady, setAuthReady] = createSignal(false);
  const [meals, setMeals] = createSignal<Meal[]>([]);
  const [events, setEvents] = createSignal<GiEvent[]>([]);
  const [skinEntries, setSkinEntries] = createSignal<SkinEntry[]>([]);
  const [analysis, setAnalysis] = createSignal<CorrelationAnalysis | null>(null);
  const [appError, setAppError] = createSignal("");
  const readOnly = createMemo(() => isDemoUser(user()));

  function handleAuthenticated(currentUser: User | null) {
    setUser(currentUser);
    setAuthReady(true);
    setAppError("");

    if (!currentUser) {
      setMeals([]);
      setEvents([]);
      setSkinEntries([]);
      setAnalysis(null);
      return;
    }

    if (isDemoUser(currentUser)) return;

    void ensureUserProfile(currentUser).catch((err) => {
      setAppError(getErrorMessage(err, "Your profile could not be prepared."));
    });
  }

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthenticated);

    onCleanup(() => unsubscribe());
  });

  createEffect(() => {
    const u = user();
    if (!u) return;

    const handleSubscriptionError = (err: unknown) => {
      setAppError(getErrorMessage(err, "Live updates are temporarily unavailable."));
    };

    const unsubscribeMeals = subscribeMeals(u.uid, setMeals, handleSubscriptionError);
    const unsubscribeEvents = subscribeGiEvents(u.uid, setEvents, handleSubscriptionError);
    const unsubscribeSkinEntries = subscribeSkinEntries(
      u.uid,
      setSkinEntries,
      handleSubscriptionError,
    );
    const unsubscribeAnalysis = subscribeCurrentAnalysis(
      u.uid,
      setAnalysis,
      handleSubscriptionError,
    );

    onCleanup(() => {
      unsubscribeMeals();
      unsubscribeEvents();
      unsubscribeSkinEntries();
      unsubscribeAnalysis();
    });
  });

  async function handleSignOut() {
    setAppError("");
    try {
      await signOut(auth);
    } catch (err) {
      setAppError(getErrorMessage(err, "Sign out failed."));
    }
  }

  return (
    <Show when={hasFirebaseConfig} fallback={<ConfigMissing />}>
      <Show when={authReady()} fallback={<LoadingScreen />}>
        <Show when={user()} fallback={<AuthScreen onAuthenticated={handleAuthenticated} />}>
          <TrackerContext.Provider
            value={{
              user: () => user()!,
              readOnly,
              meals,
              events,
              skinEntries,
              analysis,
            }}
          >
            <main class="min-h-screen bg-background text-foreground">
              <header class="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
                <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                  <div class="flex min-w-0 items-center gap-3">
                    <div class="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background">
                      <Utensils size={19} aria-hidden />
                    </div>
                    <div class="min-w-0">
                      <div class="flex min-w-0 items-baseline gap-2">
                        <h1 class="truncate text-base font-semibold">Meal Signal</h1>
                        <Show when={__APP_COMMIT_HASH__ && __APP_COMMIT_URL__}>
                          <a
                            href={__APP_COMMIT_URL__}
                            target="_blank"
                            rel="noreferrer"
                            class="shrink-0 font-mono text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
                            title="Open this build's source on GitHub"
                          >
                            {__APP_COMMIT_HASH__}
                          </a>
                        </Show>
                      </div>
                      <p class="truncate text-sm text-muted">{user()!.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    class="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted"
                    aria-label="Sign out"
                    title="Sign out"
                  >
                    <LogOut size={18} aria-hidden />
                  </button>
                </div>
              </header>

              <div class="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                <section class="min-w-0">
                  {appError() ? (
                    <div class="mb-4">
                      <StatusMessage tone="error">{appError()}</StatusMessage>
                    </div>
                  ) : null}
                  {readOnly() ? (
                    <div class="mb-4">
                      <StatusMessage>{demoReadOnlyMessage}</StatusMessage>
                    </div>
                  ) : null}

                  <nav class="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm">
                    <NavLink href="/" icon={<Plus size={17} />}>
                      Log
                    </NavLink>
                    <NavLink href="/analysis" icon={<BarChart3 size={17} />}>
                      Analysis
                    </NavLink>
                  </nav>

                  {props.children}
                </section>

                <aside class="grid content-start gap-5">
                  <StatsStrip
                    meals={meals()}
                    events={events()}
                    skinEntries={skinEntries()}
                    analysis={analysis()}
                  />
                  <RecentEntries
                    uid={user()!.uid}
                    meals={meals()}
                    events={events()}
                    skinEntries={skinEntries()}
                    readOnly={readOnly()}
                  />
                </aside>
              </div>
            </main>
          </TrackerContext.Provider>
        </Show>
      </Show>
    </Show>
  );
}

export function LogPage() {
  const { readOnly } = useTrackerContext();

  return (
    <div class="grid gap-5">
      <MealComposer readOnly={readOnly()} />
      <GiEventForm readOnly={readOnly()} />
      <SkinEntryForm readOnly={readOnly()} />
    </div>
  );
}

export function AnalysisPage() {
  const { user, readOnly, meals, events, analysis } = useTrackerContext();

  return (
    <AnalysisPanel
      uid={user().uid}
      analysis={analysis()}
      mealCount={meals().length}
      eventCount={events().length}
      readOnly={readOnly()}
    />
  );
}

export function EntryPage() {
  const { readOnly, meals, events, skinEntries } = useTrackerContext();
  const params = useParams<{ entryKind?: string; entryId?: string }>();
  const entry = createMemo<RecentEntry | null>(() => {
    if (params.entryKind === "meals") {
      const meal = meals().find((item) => item.id === params.entryId);
      return meal ? { kind: "meal", date: meal.eatenAt, meal } : null;
    }

    if (params.entryKind === "events") {
      const event = events().find((item) => item.id === params.entryId);
      return event ? { kind: "event", date: event.occurredAt, event } : null;
    }

    if (params.entryKind === "skin") {
      const skinEntry = skinEntries().find((item) => item.id === params.entryId);
      return skinEntry ? { kind: "skin", date: skinEntry.sortAt, skinEntry } : null;
    }

    return null;
  });

  return entry() ? (
    <EntryDetailPage entry={entry()!} readOnly={readOnly()} />
  ) : (
    <section class="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <EmptyState icon={<Utensils size={22} />} title="Entry not found" />
    </section>
  );
}
