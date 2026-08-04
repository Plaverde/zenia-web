import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkLoginRateLimit(email: string): boolean {
  const now = Date.now();
  const key = `login:${email}`;
  const entry = loginAttempts.get(key);

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) return false;

  entry.count++;
  return true;
}

async function getAdminUser(email: string) {
  const result = await prisma.$queryRaw<
    { id: number; email: string; password_hash: string; name: string; role: string }[]
  >`SELECT id, email, password_hash, name, role FROM admin_users WHERE email = ${email}`;
  return result[0] ?? null;
}

async function updateLastLogin(id: number) {
  await prisma.$executeRaw`UPDATE admin_users SET last_login_at = NOW() WHERE id = ${id}`;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;

        if (!checkLoginRateLimit(email)) {
          console.warn("[AUTH] Rate limit exceeded for:", email);
          return null;
        }

        try {
          const user = await getAdminUser(email);

          if (!user) {
            console.error("[AUTH] No user found for email:", credentials.email);
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password_hash
          );

          if (!passwordMatch) {
            console.error("[AUTH] Password mismatch for:", credentials.email);
            return null;
          }

          await updateLastLogin(user.id);

          console.log("[AUTH] Login successful for:", credentials.email);
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("[AUTH] Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});
