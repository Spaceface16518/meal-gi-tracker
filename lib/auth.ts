import "server-only";

import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { ObjectId } from "mongodb";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "@/lib/auth.config";
import { getDb } from "@/lib/mongo";

const scryptAsync = promisify(scrypt);

type UserDoc = {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: Date;
};

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hashHex] = storedHash.split(":");
  if (!salt || !hashHex) return false;

  const actual = (await scryptAsync(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hashHex, "hex");
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

async function getUsersCollection() {
  const db = await getDb();
  const users = db.collection<UserDoc>("users");
  await users.createIndex({ email: 1 }, { unique: true });
  return users;
}

async function getUserByEmail(email: string): Promise<UserDoc | null> {
  const users = await getUsersCollection();
  return users.findOne({ email });
}

export async function createUser(params: {
  email: string;
  password: string;
  name?: string;
}): Promise<{ id: string; email: string; name?: string }> {
  const email = normalizeEmail(params.email);
  const password = params.password;
  const name = params.name?.trim() || undefined;

  if (!email.includes("@")) {
    throw new Error("Please enter a valid email address");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const users = await getUsersCollection();
  const user: Omit<UserDoc, "_id"> = {
    email,
    passwordHash: await hashPassword(password),
    name,
    createdAt: new Date()
  };

  try {
    const result = await users.insertOne(user as UserDoc);
    return { id: result.insertedId.toString(), email, name };
  } catch (error: unknown) {
    if ((error as { code?: number }).code === 11000) {
      throw new Error("An account with that email already exists");
    }
    throw error;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = normalizeEmail(String(credentials?.email || ""));
        const password = String(credentials?.password || "");
        if (!email || !password) return null;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user._id.toHexString(),
          email: user.email,
          name: user.name || null
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
});

export async function getAuthenticatedUserId(): Promise<ObjectId> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !ObjectId.isValid(userId)) {
    throw new Error("Unauthorized");
  }
  return new ObjectId(userId);
}
