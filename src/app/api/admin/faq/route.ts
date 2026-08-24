import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { faqItemSchema } from "@/lib/admin-schemas";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const faqs = await prisma.faq_items.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const parsed = faqItemSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  try {
    const faq = await prisma.faq_items.create({
      data,
    });

    return NextResponse.json(faq, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating FAQ" }, { status: 500 });
  }
}
