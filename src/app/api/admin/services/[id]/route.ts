import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { serviceUpdateSchema } from "@/lib/admin-schemas";

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
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const serviceId = parseInt(id);

  const parsed = serviceUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  try {
    let slug: string | undefined;
    if (data.title) {
      const current = await prisma.services.findUnique({
        where: { id: serviceId },
        select: { title: true },
      });
      if (current && current.title !== data.title) {
        slug = await uniqueSlug(generateSlug(data.title), serviceId);
      }
    }

    const service = await prisma.services.update({
      where: { id: serviceId },
      data: {
        ...data,
        ...(slug ? { slug } : {}),
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
  const { error } = await requireAdmin();
  if (error) return error;

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
