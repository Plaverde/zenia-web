import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BlogDisclaimer } from "@/components/ui/BlogDisclaimer";
import { EmergencyBanner } from "@/components/ui/EmergencyBanner";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { prisma } from "@/lib/db";
import { SITE } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const post = await prisma.blog_posts.findUnique({
      where: { slug },
    });
    return post;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blog_posts.findMany({
      where: { status: "published" },
      select: { slug: true },
    });
    return posts.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.meta_title || post.title,
    description:
      post.meta_description ||
      post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at?.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <Link href="/blog" className="text-sage-dark hover:text-charcoal">
                Blog
              </Link>
              <span className="text-warm-gray-light mx-2">/</span>
              <span className="text-warm-gray">{post.category}</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <p className="text-sage-dark font-medium mb-3">{post.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                {post.title}
              </h1>
              <p className="text-warm-gray-light">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </header>

            {/* Featured image */}
            {post.featured_image ? (
              <div className="relative aspect-[16/9] rounded-2xl mb-12 overflow-hidden">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-[16/9] bg-sand rounded-2xl mb-12 flex items-center justify-center">
                <span className="text-warm-gray-light text-sm">
                  [Imagen del artículo]
                </span>
              </div>
            )}

            {/* Content */}
            <MarkdownRenderer content={post.content} />

            {/* Emergency Banner */}
            {(post.category === "ansiedad" || post.category === "depresión" || post.category === "crisis") && (
              <div className="mt-8">
                <EmergencyBanner />
              </div>
            )}

            {/* Disclaimer */}
            <BlogDisclaimer
              includeEmergency={post.category === "depresión" || post.category === "crisis"}
            />

            {/* CTA */}
            <div className="mt-16 bg-sage/10 rounded-2xl p-8 text-center">
              <h3 className="font-serif text-2xl text-charcoal mb-3">
                ¿Te resultó útil este artículo?
              </h3>
              <p className="text-warm-gray mb-6">
                Si quieres conversar sobre lo que estás sintiendo, puedo
                acompañarte.
              </p>
              <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo">Agendar Primera Sesión</Button>
            </div>

            {/* Back to blog */}
            <div className="mt-12">
              <Link
                href="/blog"
                className="text-sage-dark font-medium hover:text-sage-dark underline underline-offset-2"
              >
                ← Volver al blog
              </Link>
            </div>

            {/* Article Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: post.title,
                  description: post.excerpt,
                  author: {
                    "@type": "Person",
                    name: SITE.name,
                    jobTitle: SITE.profession,
                  },
                  datePublished: post.published_at?.toISOString(),
                  dateModified: post.updated_at?.toISOString() || post.published_at?.toISOString(),
                  image: post.featured_image || undefined,
                  publisher: {
                    "@type": "Person",
                    name: SITE.name,
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://zenia-web.vercel.app/blog/${post.slug}`,
                  },
                }),
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
