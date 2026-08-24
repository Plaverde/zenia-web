import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const appointments = await prisma.appointments.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json({ error: "Error fetching appointments" }, { status: 500 });
  }
}
