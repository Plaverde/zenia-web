import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { appointmentUpdateSchema } from "@/lib/admin-schemas";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  const parsed = appointmentUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const appointment = await prisma.appointments.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    );
  }
}
