import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { serviceSchema } from "@/lib/admin-schemas";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let counter = 2;
  while (true) {
    const existing = await prisma.services.findFirst({
      where: { slug },
      select: { id: true },
    });
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const services = await prisma.services.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: "Error fetching services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const parsed = serviceSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  try {
    const slug = await uniqueSlug(generateSlug(data.title));

    const service = await prisma.services.create({
      data: { ...data, slug },
    });

    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  }
}
