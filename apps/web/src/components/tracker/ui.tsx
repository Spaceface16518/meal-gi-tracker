import { CircleAlert, Check, RefreshCcw } from "lucide-solid";
import type { JSX } from "solid-js";

export function TabButton(props: {
  active: boolean;
  children: JSX.Element;
  icon: JSX.Element;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      classList={{
        "flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition": true,
        "bg-brand text-background shadow-sm": props.active,
        "text-muted-strong hover:bg-surface-muted": !props.active,
      }}
    >
      {props.icon}
      {props.children}
    </button>
  );
}

export function ModeButton(props: {
  active: boolean;
  children: JSX.Element;
  icon: JSX.Element;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      classList={{
        "flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition": true,
        "border-brand bg-brand text-background": props.active,
        "border-border-strong bg-surface text-muted-strong hover:border-muted": !props.active,
      }}
    >
      {props.icon}
      {props.children}
    </button>
  );
}

export function SubmitRow(props: {
  busy: boolean;
  disabled: boolean;
  label: string;
  message: string;
  tone?: "info" | "error" | "success";
}) {
  const messageClass = () =>
    props.tone === "error"
      ? "text-danger"
      : props.tone === "success"
        ? "text-brand"
        : "text-muted-strong";

  return (
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="submit"
        disabled={props.disabled}
        class="flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-background transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {props.busy ? "Saving..." : props.label}
        {props.busy ? (
          <RefreshCcw class="animate-spin" size={16} aria-hidden />
        ) : (
          <Check size={16} aria-hidden />
        )}
      </button>
      {props.message ? (
        <p class={`text-sm ${messageClass()}`} aria-live="polite">
          {props.message}
        </p>
      ) : null}
    </div>
  );
}

export function Stat(props: { icon: JSX.Element; label: string; value: string }) {
  return (
    <div class="min-w-0 rounded-lg border border-border bg-surface p-3 shadow-sm">
      <div class="mb-2 text-brand">{props.icon}</div>
      <p class="truncate text-xs font-medium uppercase text-muted">{props.label}</p>
      <p class="truncate text-lg font-semibold">{props.value}</p>
    </div>
  );
}

export function MediaReady(props: { ready: boolean; label: string }) {
  return (
    <div
      classList={{
        "flex items-center gap-2 text-sm": true,
        "text-brand": props.ready,
        "text-muted": !props.ready,
      }}
    >
      {props.ready ? <Check size={16} aria-hidden /> : <CircleAlert size={16} aria-hidden />}
      {props.ready ? props.label : "No media selected"}
    </div>
  );
}

export function EmptyState(props: { icon: JSX.Element; title: string }) {
  return (
    <div class="grid place-items-center rounded-lg border border-dashed border-border-strong p-8 text-center text-muted">
      <div class="mb-2 text-muted">{props.icon}</div>
      <p class="text-sm font-medium">{props.title}</p>
    </div>
  );
}

export function StatusMessage(props: { children: JSX.Element; tone?: "info" | "error" }) {
  const className = () =>
    props.tone === "error"
      ? "border-danger/30 bg-danger-soft text-danger-strong"
      : "border-border bg-surface-muted text-muted-strong";

  return (
    <p class={`rounded-lg border px-3 py-2 text-sm ${className()}`} aria-live="polite">
      {props.children}
    </p>
  );
}

export function LoadingScreen() {
  return (
    <main class="grid min-h-screen place-items-center bg-background text-muted-strong">
      <RefreshCcw class="animate-spin" size={22} aria-label="Loading" />
    </main>
  );
}

export function ConfigMissing() {
  return (
    <main class="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <section class="w-full max-w-md rounded-lg border border-border bg-surface p-5 shadow-sm">
        <h1 class="mb-2 text-lg font-semibold">Firebase config missing</h1>
        <p class="text-sm text-muted-strong">
          Add the Firebase Web App values to `.env.local` or the Vite environment variables.
        </p>
      </section>
    </main>
  );
}
