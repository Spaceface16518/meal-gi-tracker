"use client";

import { BarChart3, LogOut, Plus, Utensils } from "lucide-react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthScreen } from "@/components/tracker/auth-screen";
import { GiEventForm } from "@/components/tracker/gi-event-form";
import { MealComposer } from "@/components/tracker/meal-composer";
import { AnalysisPanel } from "@/components/tracker/analysis-panel";
import { RecentEntries, StatsStrip } from "@/components/tracker/sidebar";
import { ConfigMissing, LoadingScreen, StatusMessage, TabButton } from "@/components/tracker/ui";
import { auth, hasFirebaseConfig } from "@/lib/firebase";
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
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [view, setView] = useState<View>("log");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [events, setEvents] = useState<GiEvent[]>([]);
  const [analysis, setAnalysis] = useState<CorrelationAnalysis | null>(null);
  const [appError, setAppError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      setAppError("");

      if (!currentUser) {
        setMeals([]);
        setEvents([]);
        setAnalysis(null);
      } else {
        void ensureUserProfile(currentUser).catch((err) => {
          setAppError(getErrorMessage(err, "Your profile could not be prepared."));
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const handleSubscriptionError = (err: unknown) => {
      setAppError(getErrorMessage(err, "Live updates are temporarily unavailable."));
    };

    const unsubscribeMeals = subscribeMeals(user.uid, setMeals, handleSubscriptionError);
    const unsubscribeEvents = subscribeGiEvents(user.uid, setEvents, handleSubscriptionError);
    const unsubscribeAnalysis = subscribeCurrentAnalysis(user.uid, setAnalysis, handleSubscriptionError);

    return () => {
      unsubscribeMeals();
      unsubscribeEvents();
      unsubscribeAnalysis();
    };
  }, [user]);

  async function handleSignOut() {
    setAppError("");
    try {
      await signOut(auth);
    } catch (err) {
      setAppError(getErrorMessage(err, "Sign out failed."));
    }
  }

  if (!hasFirebaseConfig) return <ConfigMissing />;
  if (!authReady) return <LoadingScreen />;
  if (!user) return <AuthScreen />;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background">
              <Utensils size={19} aria-hidden />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold">Meal Signal</h1>
              <p className="truncate text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted-strong shadow-sm transition hover:border-muted"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={18} aria-hidden />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0">
          {appError ? (
            <div className="mb-4">
              <StatusMessage tone="error">{appError}</StatusMessage>
            </div>
          ) : null}

          <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm">
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
          <RecentEntries uid={user.uid} meals={meals} events={events} />
        </aside>
      </div>
    </main>
  );
}
