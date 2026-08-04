import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const reserveSchema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  service_type: z.string().min(1),
  appointment_date: z.string().min(1),
  appointment_time: z.string().min(1),
  modality: z.string(),
  notes: z.string().optional().default(""),
  consent: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = reserveSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Validation errors:", parsed.error.issues);
      return NextResponse.json(
        { success: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!data.consent) {
      return NextResponse.json(
        { success: false, error: "Debes aceptar el tratamiento de datos" },
        { status: 400 }
      );
    }

    if (!["presencial", "virtual"].includes(data.modality)) {
      return NextResponse.json(
        { success: false, error: "Modalidad inválida" },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(data.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      return NextResponse.json(
        { success: false, error: "La fecha debe ser hoy o en el futuro" },
        { status: 400 }
      );
    }

    await prisma.appointments.create({
      data: {
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        service_type: data.service_type,
        appointment_date: new Date(data.appointment_date),
        appointment_time: data.appointment_time,
        modality: data.modality,
        notes: data.notes || null,
        consent: true,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { success: false, error: "Error al guardar la cita. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
