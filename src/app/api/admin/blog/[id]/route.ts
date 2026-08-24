import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { blogPostSchema } from "@/lib/admin-schemas";

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
  const { error } = await requireAdmin();
  if (error) return error;

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
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const postId = parseInt(id);

  const parsed = blogPostSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  // Regenerate slug if title changed
  let slug: string | undefined;
  const currentPost = await prisma.blog_posts.findUnique({
    where: { id: postId },
    select: { title: true, published_at: true },
  });
  if (currentPost && currentPost.title !== data.title) {
    const baseSlug = generateSlug(data.title);
    slug = await uniqueSlug(baseSlug, postId);
  }

  try {
    const post = await prisma.blog_posts.update({
      where: { id: postId },
      data: {
        ...(slug ? { slug } : {}),
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        featured_image: data.featured_image,
        status: data.status,
        ...(data.status === "published" && !currentPost?.published_at
          ? { published_at: new Date() }
          : data.status === "draft"
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
  const { error } = await requireAdmin();
  if (error) return error;

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
