import { BarChart3, LogOut, Plus, Utensils } from "lucide-solid";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { Show, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { AuthScreen } from "@/components/tracker/auth-screen";
import { GiEventForm } from "@/components/tracker/gi-event-form";
import { MealComposer } from "@/components/tracker/meal-composer";
import { AnalysisPanel } from "@/components/tracker/analysis-panel";
import { RecentEntries, StatsStrip } from "@/components/tracker/sidebar";
import { ConfigMissing, LoadingScreen, StatusMessage, TabButton } from "@/components/tracker/ui";
import { auth, hasFirebaseConfig } from "@/lib/firebase";
import { demoReadOnlyMessage, isDemoUser } from "@/lib/demo";
import { getErrorMessage } from "@/lib/errors";
import {
  ensureUserProfile,
  subscribeCurrentAnalysis,
  subscribeGiEvents,
  subscribeMeals,
} from "@/lib/firestore";
import type { CorrelationAnalysis, GiEvent, Meal } from "@/lib/types";

type View = "log" | "analysis";

export function TrackerApp() {
  const [user, setUser] = createSignal<User | null>(auth.currentUser);
  const [authReady, setAuthReady] = createSignal(true);
  const [view, setView] = createSignal<View>("log");
  const [meals, setMeals] = createSignal<Meal[]>([]);
  const [events, setEvents] = createSignal<GiEvent[]>([]);
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
    const unsubscribeAnalysis = subscribeCurrentAnalysis(u.uid, setAnalysis, handleSubscriptionError);

    onCleanup(() => {
      unsubscribeMeals();
      unsubscribeEvents();
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
          <main class="min-h-screen bg-background text-foreground">
            <header class="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
              <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                <div class="flex min-w-0 items-center gap-3">
                  <div class="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background">
                    <Utensils size={19} aria-hidden />
                  </div>
                  <div class="min-w-0">
                    <h1 class="truncate text-base font-semibold">Meal Signal</h1>
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

                <div class="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm">
                  <TabButton active={view() === "log"} onClick={() => setView("log")} icon={<Plus size={17} />}>
                    Log
                  </TabButton>
                  <TabButton
                    active={view() === "analysis"}
                    onClick={() => setView("analysis")}
                    icon={<BarChart3 size={17} />}
                  >
                    Analysis
                  </TabButton>
                </div>

                {view() === "log" ? (
                  <div class="grid gap-5">
                    <MealComposer readOnly={readOnly()} />
                    <GiEventForm readOnly={readOnly()} />
                  </div>
                ) : (
                  <AnalysisPanel
                    uid={user()!.uid}
                    analysis={analysis()}
                    mealCount={meals().length}
                    eventCount={events().length}
                    readOnly={readOnly()}
                  />
                )}
              </section>

              <aside class="grid content-start gap-5">
                <StatsStrip meals={meals()} events={events()} analysis={analysis()} />
                <RecentEntries uid={user()!.uid} meals={meals()} events={events()} readOnly={readOnly()} />
              </aside>
            </div>
          </main>
        </Show>
      </Show>
    </Show>
  );
}
