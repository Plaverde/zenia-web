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
    const testimonial = await prisma.testimonials.update({
      where: { id: parseInt(id) },
      data: {
        patient_name: body.patient_name,
        content: body.content,
        rating: body.rating,
        active: body.active,
        order: body.order,
      },
    });
    return NextResponse.json(testimonial);
  } catch {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.testimonials.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }
}
