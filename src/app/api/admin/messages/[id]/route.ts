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
    const message = await prisma.contact_messages.update({
      where: { id: parseInt(id) },
      data: { read: body.read },
    });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
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
    await prisma.contact_messages.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
}
