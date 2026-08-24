import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { testimonialSchema } from "@/lib/admin-schemas";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const testimonials = await prisma.testimonials.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const parsed = testimonialSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const testimonial = await prisma.testimonials.create({
      data: parsed.data,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating testimonial" }, { status: 500 });
  }
}
