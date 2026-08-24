import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Re-checks the admin role inside each handler instead of relying solely on
 * proxy.ts's matcher — a single point of failure if a route is ever added
 * outside /api/admin/* or the matcher is misconfigured.
 */
export async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || role !== "admin") {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    } as const;
  }

  return { session, error: null } as const;
}
