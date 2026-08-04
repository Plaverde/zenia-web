import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos educativos sobre ansiedad, depresión, mindfulness y terapia ACT. Contenido para entender y cuidar tu salud mental.",
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  featured_image: string | null;
};

async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blog_posts.findMany({
      where: { status: "published" },
      orderBy: { published_at: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        published_at: true,
        featured_image: true,
      },
    });
    return posts.map((p: { slug: string; title: string; excerpt: string; category: string; published_at: Date | null; featured_image: string | null }) => ({
      ...p,
      published_at: p.published_at?.toISOString() || "",
    }));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Blog"
              subtitle="Contenido educativo para entender y cuidar tu salud mental"
            />

            {posts.length === 0 ? (
              <p className="text-center text-warm-gray">
                Próximamente publicaremos artículos interesantes.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article className="group bg-white rounded-2xl overflow-hidden border border-sand/50 shadow-sm hover:shadow-md transition-all duration-300">
                      {/* Featured image */}
                      {post.featured_image ? (
                        <div className="relative aspect-[16/10] group-hover:scale-[1.02] transition-transform duration-300">
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-sand flex items-center justify-center group-hover:bg-sage/10 transition-colors">
                          <span className="text-warm-gray-light text-xs">
                            [Imagen del artículo]
                          </span>
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-sage-dark text-sm font-medium mb-2">
                          {post.category}
                        </p>
                        <h2 className="font-serif text-xl text-charcoal mb-3 group-hover:text-sage-dark transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-warm-gray text-sm leading-relaxed mb-3">
                          {post.excerpt}
                        </p>
                        <p className="text-warm-gray-light text-xs">
                          {new Date(post.published_at).toLocaleDateString(
                            "es-CO",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
