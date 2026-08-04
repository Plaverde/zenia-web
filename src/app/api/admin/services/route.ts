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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const slug = await uniqueSlug(generateSlug(body.title));

    const service = await prisma.services.create({
      data: {
        slug,
        title: body.title,
        description: body.description,
        duration: body.duration,
        price: body.price,
        order: body.order || 0,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  }
}
