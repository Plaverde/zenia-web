import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uniqueSlug(base: string, excludeId: number): Promise<string> {
  let slug = base;
  let counter = 2;
  while (true) {
    const existing = await prisma.services.findFirst({
      where: { slug, id: { not: excludeId } },
      select: { id: true },
    });
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const serviceId = parseInt(id);
  const body = await request.json();

  try {
    let slug: string | undefined;
    if (body.title) {
      const current = await prisma.services.findUnique({
        where: { id: serviceId },
        select: { title: true },
      });
      if (current && current.title !== body.title) {
        slug = await uniqueSlug(generateSlug(body.title), serviceId);
      }
    }

    const service = await prisma.services.update({
      where: { id: serviceId },
      data: {
        ...(slug ? { slug } : {}),
        title: body.title,
        description: body.description,
        duration: body.duration,
        price: body.price,
        active: body.active,
        order: body.order,
      },
    });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
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
    await prisma.services.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
}
