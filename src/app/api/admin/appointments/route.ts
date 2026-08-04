import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const appointments = await prisma.appointments.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json({ error: "Error fetching appointments" }, { status: 500 });
  }
}
