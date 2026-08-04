import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  message: z.string().min(10),
  consent: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

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

    await prisma.contact_messages.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        consent: true,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { success: false, error: "Error al enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
