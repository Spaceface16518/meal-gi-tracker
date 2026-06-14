"use client";

import { ChevronRight, Mail, Utensils } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { getErrorMessage } from "@/lib/errors";

export function AuthScreen() {
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
      setError(getErrorMessage(err, "Authentication failed."));
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
      setError(getErrorMessage(err, "Google sign-in failed."));
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

          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" aria-live="polite">
              {error}
            </p>
          ) : null}

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
