import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SPECIALTIES } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zenia-web.vercel.app";
  const now = new Date();

  const staticRoutes = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/sobre-mi`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/especialidades`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/terapia-online`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/servicios`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tarifas`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/recursos`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/autoevaluacion`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contacto`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/consentimiento-informado`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${baseUrl}/politica-datos`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/aviso-privacidad`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/derechos-personas`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${baseUrl}/terminos-de-uso`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const specialtyRoutes = SPECIALTIES.map((specialty) => ({
    url: `${baseUrl}/especialidades/${specialty.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blog_posts.findMany({
      where: { status: "published" },
      select: { slug: true, updated_at: true, published_at: true },
    });
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at || post.published_at || now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Si la base de datos no está disponible, omitimos las rutas del blog
  }

  return [
    ...staticRoutes.map((route) => ({ ...route, lastModified: now })),
    ...specialtyRoutes,
    ...blogRoutes,
  ];
}
