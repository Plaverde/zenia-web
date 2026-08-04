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
    const appointment = await prisma.appointments.update({
      where: { id: parseInt(id) },
      data: {
        status: body.status,
        admin_notes: body.admin_notes,
      },
    });

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    );
  }
}
