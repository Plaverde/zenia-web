import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { patientUpdateSchema } from "@/lib/admin-schemas";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  const parsed = patientUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const patient = await prisma.patients_leads.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });

    return NextResponse.json(patient);
  } catch {
    return NextResponse.json(
      { error: "Patient not found" },
      { status: 404 }
    );
  }
}
