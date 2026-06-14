"use client";

import { CircleAlert, Check, RefreshCcw } from "lucide-react";

export function TabButton({
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

export function ModeButton({
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

export function SubmitRow({
  busy,
  disabled,
  label,
  message,
  tone = "info",
}: {
  busy: boolean;
  disabled: boolean;
  label: string;
  message: string;
  tone?: "info" | "error" | "success";
}) {
  const messageClass =
    tone === "error"
      ? "text-red-700"
      : tone === "success"
        ? "text-emerald-900"
        : "text-stone-600";

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
      {message ? (
        <p className={`text-sm ${messageClass}`} aria-live="polite">
          {message}
        </p>
      ) : null}
    </div>
  );
}

export function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
      <div className="mb-2 text-emerald-950">{icon}</div>
      <p className="truncate text-xs font-medium uppercase text-stone-500">{label}</p>
      <p className="truncate text-lg font-semibold">{value}</p>
    </div>
  );
}

export function MediaReady({ ready, label }: { ready: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${ready ? "text-emerald-900" : "text-stone-500"}`}>
      {ready ? <Check size={16} aria-hidden /> : <CircleAlert size={16} aria-hidden />}
      {ready ? label : "No media selected"}
    </div>
  );
}

export function EmptyState({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-stone-300 p-8 text-center text-stone-500">
      <div className="mb-2 text-stone-400">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}

export function StatusMessage({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "error";
}) {
  const className =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-stone-200 bg-stone-100 text-stone-700";

  return (
    <p className={`rounded-lg border px-3 py-2 text-sm ${className}`} aria-live="polite">
      {children}
    </p>
  );
}

export function LoadingScreen() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f3] text-stone-600">
      <RefreshCcw className="animate-spin" size={22} aria-label="Loading" />
    </main>
  );
}

export function ConfigMissing() {
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
