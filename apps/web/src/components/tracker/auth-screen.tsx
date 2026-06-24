import { ChevronRight, Eye, Mail, Utensils } from "lucide-solid";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { createSignal } from "solid-js";
import { auth } from "@/lib/firebase";
import { demoUserEmail, demoUserPassword, hasDemoLogin } from "@/lib/demo";
import { getErrorMessage } from "@/lib/errors";

type AuthScreenProps = {
  onAuthenticated?: (user: User) => void;
};

export function AuthScreen(props: AuthScreenProps) {
  const [mode, setMode] = createSignal<"signin" | "signup">("signin");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [busy, setBusy] = createSignal(false);
  const [error, setError] = createSignal("");

  async function submit(event: Event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      if (mode() === "signin") {
        const credential = await signInWithEmailAndPassword(auth, email(), password());
        props.onAuthenticated?.(credential.user);
      } else {
        const credential = await createUserWithEmailAndPassword(auth, email(), password());
        props.onAuthenticated?.(credential.user);
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
      const credential = await signInWithPopup(auth, provider);
      props.onAuthenticated?.(credential.user);
    } catch (err) {
      setError(getErrorMessage(err, "Google sign-in failed."));
    } finally {
      setBusy(false);
    }
  }

  async function signInWithDemo() {
    setBusy(true);
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(auth, demoUserEmail, demoUserPassword);
      props.onAuthenticated?.(credential.user);
    } catch (err) {
      setError(getErrorMessage(err, "Demo sign-in failed."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main class="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm">
        <div class="mb-6 flex items-center gap-3">
          <div class="grid size-11 place-items-center rounded-lg bg-brand text-background">
            <Utensils size={20} aria-hidden />
          </div>
          <div>
            <h1 class="text-xl font-semibold">Meal Signal</h1>
            <p class="text-sm text-muted">Private meal and symptom tracking</p>
          </div>
        </div>

        <form class="grid gap-4" onSubmit={submit}>
          <label class="grid gap-1 text-sm font-medium text-muted-strong">
            Email
            <span class="relative">
              <Mail
                class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                size={17}
                aria-hidden
              />
              <input
                class="h-11 w-full rounded-lg border border-border-strong bg-surface pl-10 pr-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                type="email"
                autocomplete="email"
                value={email()}
                onInput={(event) => setEmail((event.target as HTMLInputElement).value)}
                required
              />
            </span>
          </label>

          <label class="grid gap-1 text-sm font-medium text-muted-strong">
            Password
            <input
              class="h-11 rounded-lg border border-border-strong bg-surface px-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              type="password"
              autocomplete={mode() === "signin" ? "current-password" : "new-password"}
              value={password()}
              minLength={6}
              onInput={(event) => setPassword((event.target as HTMLInputElement).value)}
              required
            />
          </label>

          {error() ? (
            <p class="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger" aria-live="polite">
              {error()}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy()}
            class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy() ? "Working..." : mode() === "signin" ? "Sign in" : "Create account"}
            <ChevronRight size={17} aria-hidden />
          </button>
        </form>

        <div class="my-4 flex items-center gap-3 text-xs font-medium uppercase text-muted">
          <span class="h-px flex-1 bg-border" />
          Or
          <span class="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={busy()}
          class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 text-sm font-semibold text-muted-strong transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue with Google
          <ChevronRight size={17} aria-hidden />
        </button>

        {hasDemoLogin ? (
          <button
            type="button"
            onClick={signInWithDemo}
            disabled={busy()}
            class="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-brand bg-brand-soft px-4 text-sm font-semibold text-brand transition hover:border-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Eye size={17} aria-hidden />
            View demo
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => setMode(mode() === "signin" ? "signup" : "signin")}
          class="mt-4 w-full text-center text-sm font-medium text-brand"
        >
          {mode() === "signin" ? "Create a new account" : "Sign in instead"}
        </button>
      </section>
    </main>
  );
}
