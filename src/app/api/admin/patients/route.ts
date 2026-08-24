import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const patients = await prisma.patients_leads.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(patients);
  } catch {
    return NextResponse.json({ error: "Error fetching patients" }, { status: 500 });
  }
}
