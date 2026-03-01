import { NextRequest } from "next/server";

const REALM = "Meal GI Tracker";

function unauthorizedResponse(): Response {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm=\"${REALM}\", charset=\"UTF-8\"`
    }
  });
}

function parseBasicAuth(header: string | null): { username: string; password: string } | null {
  if (!header || !header.startsWith("Basic ")) {
    return null;
  }

  const token = header.slice("Basic ".length).trim();
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return {
      username: decoded.slice(0, idx),
      password: decoded.slice(idx + 1)
    };
  } catch {
    return null;
  }
}

export function requirePasscode(request: NextRequest): Response | null {
  const expected = process.env.APP_PASSCODE;
  if (!expected) {
    return new Response("Server misconfigured: APP_PASSCODE missing", { status: 500 });
  }

  const parsed = parseBasicAuth(request.headers.get("authorization"));
  if (!parsed || parsed.password !== expected) {
    return unauthorizedResponse();
  }

  return null;
}
