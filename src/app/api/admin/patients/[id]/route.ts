import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  try {
    const patient = await prisma.patients_leads.update({
      where: { id: parseInt(id) },
      data: {
        status: body.status,
        notes: body.notes,
      },
    });

    return NextResponse.json(patient);
  } catch {
    return NextResponse.json(
      { error: "Patient not found" },
      { status: 404 }
    );
  }
}
