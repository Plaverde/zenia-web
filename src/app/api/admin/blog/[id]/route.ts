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
    const existing = await prisma.blog_posts.findFirst({
      where: { slug, id: { not: excludeId } },
      select: { id: true },
    });
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const post = await prisma.blog_posts.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
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
  const body = await request.json();
  const postId = parseInt(id);

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  // Regenerate slug if title changed
  let slug: string | undefined;
  const currentPost = await prisma.blog_posts.findUnique({
    where: { id: postId },
    select: { title: true, published_at: true },
  });
  if (currentPost && currentPost.title !== body.title) {
    const baseSlug = generateSlug(body.title);
    slug = await uniqueSlug(baseSlug, postId);
  }

  try {
    const post = await prisma.blog_posts.update({
      where: { id: postId },
      data: {
        ...(slug ? { slug } : {}),
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        meta_title: body.meta_title,
        meta_description: body.meta_description,
        featured_image: body.featured_image,
        status: body.status,
        ...(body.status === "published" && !currentPost?.published_at
          ? { published_at: new Date() }
          : body.status === "draft"
          ? { published_at: null }
          : {}),
      },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
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
    await prisma.blog_posts.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
