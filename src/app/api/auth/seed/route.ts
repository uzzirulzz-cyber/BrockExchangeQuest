import { NextResponse } from "next/server";
import { seedDefaultAccounts } from "@/lib/seed";

/** POST /api/auth/seed — idempotent. Creates the 1 Super Admin + 5 Sub-Agents. */
export async function POST() {
  try {
    const result = await seedDefaultAccounts();
    return NextResponse.json({
      ok: true,
      created: result.created,
      skipped: result.skipped,
      adminEmail: result.adminEmail,
      subAgentEmails: result.subAgentEmails,
      invitationCodes: result.invitationCodes,
      message: `Seeded ${result.created} accounts, ${result.skipped} already existed.`,
    });
  } catch (err: any) {
    console.error("[auth/seed] error", err);
    const msg = String(err?.message || "");
    const isMissingTable = msg.includes("does not exist") || msg.includes("no such table") || msg.includes("P2021");
    return NextResponse.json({
      error: isMissingTable
        ? "Database not initialized. Run 'bun run db:push' on the deployment first."
        : "Internal server error",
      detail: msg.slice(0, 300),
    }, { status: 500 });
  }
}

/** GET also seeds (idempotent). */
export async function GET() {
  try {
    const result = await seedDefaultAccounts();
    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (err: any) {
    console.error("[auth/seed] error", err);
    const msg = String(err?.message || "");
    const isMissingTable = msg.includes("does not exist") || msg.includes("no such table") || msg.includes("P2021");
    return NextResponse.json({
      error: isMissingTable
        ? "Database not initialized. Run 'bun run db:push' on the deployment first."
        : "Internal server error",
      detail: msg.slice(0, 300),
    }, { status: 500 });
  }
}
