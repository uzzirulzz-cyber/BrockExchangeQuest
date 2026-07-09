import { NextResponse } from "next/server";

/**
 * GET /api/health — deployment health check.
 *
 * Returns the status of every required env var + whether the Prisma client
 * loaded. Use this to debug "Internal server error" on fresh deployments.
 */
export async function GET() {
  const checks: Record<string, { ok: boolean; detail?: string }> = {};

  // Env vars
  for (const v of ["DATABASE_URL", "DIRECT_URL", "MONGODB_URI"]) {
    checks[v] = { ok: !!process.env[v], detail: process.env[v] ? "(set)" : "MISSING" };
  }

  // Prisma client load
  try {
    const mod = await import("@prisma/client");
    checks["prisma_client"] = {
      ok: !!mod.PrismaClient,
      detail: mod.PrismaClient ? "loaded" : "PrismaClient export missing",
    };
  } catch (err: any) {
    checks["prisma_client"] = { ok: false, detail: err?.message || "import failed" };
  }

  // Prisma DB ping (only if DATABASE_URL is set)
  if (process.env.DATABASE_URL) {
    try {
      const { db } = await import("@/lib/db");
      await db.$queryRaw`SELECT 1`;
      checks["db_connection"] = { ok: true, detail: "connected" };
    } catch (err: any) {
      checks["db_connection"] = { ok: false, detail: err?.message?.slice(0, 200) || "query failed" };
    }
  } else {
    checks["db_connection"] = { ok: false, detail: "skipped (DATABASE_URL not set)" };
  }

  const allOk = Object.values(checks).every((c) => c.ok);
  return NextResponse.json(
    { ok: allOk, checks, node_env: process.env.NODE_ENV, timestamp: new Date().toISOString() },
    { status: allOk ? 200 : 500 }
  );
}
