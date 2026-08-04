import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const faqs = await prisma.faq_items.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const faq = await prisma.faq_items.create({
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order || 0,
        active: body.active ?? true,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating FAQ" }, { status: 500 });
  }
}
