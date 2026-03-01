import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { createUser, signIn } from "@/lib/auth";

function readParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function RegisterPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  async function registerAction(formData: FormData) {
    "use server";

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!email || !password) {
      redirect("/register?error=Email+and+password+are+required");
    }
    if (password !== confirmPassword) {
      redirect("/register?error=Passwords+do+not+match");
    }

    try {
      await createUser({ name, email, password });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      redirect(`/register?error=${encodeURIComponent(message)}`);
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      redirect("/register?error=Could+not+sign+in+after+registration");
    }
    redirect(result?.url || "/");
  }

  const params = await searchParams;
  const error = readParam(params.error);

  return (
    <main className="app-shell">
      <PageHero title="Create Account" subtitle="Register a user account stored in MongoDB." />
      <Surface>
        <form action={registerAction}>
          <label>
            Name (optional)
            <input name="name" autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Password (min 8 chars)
            <input name="password" type="password" required minLength={8} autoComplete="new-password" />
          </label>
          <label>
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
          <button type="submit">Create Account</button>
        </form>
        <p>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </Surface>
      {error ? (
        <div className="status-wrap">
          <p className="status-error">{error}</p>
        </div>
      ) : null}
    </main>
  );
}
