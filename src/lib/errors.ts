import { FirebaseError } from "firebase/app";

const firebaseMessages: Record<string, string> = {
  "auth/email-already-in-use": "An account already exists for that email address.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/popup-closed-by-user": "Google sign-in was closed before it finished.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "functions/failed-precondition": "The request cannot be completed yet.",
  "functions/invalid-argument": "Some submitted information is invalid.",
  "functions/not-found": "The requested record was not found.",
  "functions/permission-denied": "You do not have access to that record.",
  "functions/resource-exhausted": "The request is too large or the service is busy.",
  "functions/unauthenticated": "Sign in before making changes.",
  "permission-denied": "You do not have access to this data.",
  unavailable: "The service is temporarily unavailable. Try again shortly.",
};

export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof FirebaseError) {
    return firebaseMessages[error.code] ?? error.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
}
