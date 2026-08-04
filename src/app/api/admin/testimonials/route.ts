import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const testimonials = await prisma.testimonials.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const testimonial = await prisma.testimonials.create({
      data: {
        patient_name: body.patient_name,
        content: body.content,
        rating: body.rating || 5,
        active: body.active ?? true,
        order: body.order || 0,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating testimonial" }, { status: 500 });
  }
}
