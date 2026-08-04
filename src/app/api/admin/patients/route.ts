import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const patients = await prisma.patients_leads.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(patients);
  } catch {
    return NextResponse.json({ error: "Error fetching patients" }, { status: 500 });
  }
}
