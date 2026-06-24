import type { User } from "firebase/auth";

export const demoUserUid = import.meta.env.VITE_DEMO_UID || "WiIKxxa28abvJzcfpVdmBJ0gmeJ3";
export const demoUserEmail = import.meta.env.VITE_DEMO_EMAIL || "";
export const demoUserPassword = import.meta.env.VITE_DEMO_PASSWORD || "";
export const demoReadOnlyMessage =
  "Demo mode is read-only. Sign out and create or use your own account to save changes.";

export const hasDemoLogin = Boolean(demoUserEmail && demoUserPassword);

export function isDemoUser(user: User | null | undefined) {
  return Boolean(user && user.uid === demoUserUid);
}
