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

async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  let slug = base;
  let counter = 2;
  while (true) {
    const existing = await prisma.blog_posts.findFirst({
      where: {
        slug,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
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

  const posts = await prisma.blog_posts.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const parsed = blogPostSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  const baseSlug = generateSlug(data.title);
  const slug = await uniqueSlug(baseSlug);

  try {
    const post = await prisma.blog_posts.create({
      data: {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        featured_image: data.featured_image,
        status: data.status,
        published_at: data.status === "published" ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error creating post" },
      { status: 500 }
    );
  }
}
