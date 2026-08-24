import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const messages = await prisma.contact_messages.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(messages);
}
