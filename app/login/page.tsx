import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Surface } from "@/components/Surface";
import { signIn } from "@/lib/auth";

function readParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  async function loginAction(formData: FormData) {
    "use server";

    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    if (!email || !password) {
      redirect("/login?error=Email+and+password+are+required");
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      redirect("/login?error=Invalid+email+or+password");
    }
    redirect(result?.url || "/");
  }

  const params = await searchParams;
  const error = readParam(params.error);

  return (
    <main className="app-shell">
      <PageHero title="Sign In" subtitle="Use your account to access your tracker data." />
      <Surface>
        <form action={loginAction}>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          <button type="submit">Sign In</button>
        </form>
        <p>
          New here? <Link href="/register">Create an account</Link>
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
