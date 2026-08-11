import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  full_name: z.string().trim().min(2),
  phone: z.string().trim().min(7),
  email: z.string().email().or(z.literal("")).optional(),
  preferred_modality: z.enum(["presencial", "virtual", ""]).optional(),
  preferred_contact: z.string().max(50).optional(),
  marketing_consent: z.boolean(),
});

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = rateLimit(`lead:${ip}`, 10, 15 * 60 * 1000);

  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: "Demasiados intentos. Intenta más tarde." },
      { status: 429, headers: { "Retry-After": rl.retryAfter.toString() } }
    );
  }

  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!data.marketing_consent) {
      return NextResponse.json(
        {
          success: false,
          error: "Debes autorizar el uso de tus datos para ser contactada/o",
        },
        { status: 400 }
      );
    }

    await prisma.patients_leads.create({
      data: {
        full_name: data.full_name,
        phone: data.phone,
        email: data.email || null,
        preferred_modality: data.preferred_modality || null,
        preferred_contact: data.preferred_contact || null,
        marketing_consent: true,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
