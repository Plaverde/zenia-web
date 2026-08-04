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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.blog_posts.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const baseSlug = generateSlug(body.title);
  const slug = await uniqueSlug(baseSlug);

  try {
    const post = await prisma.blog_posts.create({
      data: {
        slug,
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        meta_title: body.meta_title,
        meta_description: body.meta_description,
        featured_image: body.featured_image,
        status: body.status || "draft",
        published_at: body.status === "published" ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating post", details: error },
      { status: 500 }
    );
  }
}
