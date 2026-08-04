import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
}

interface ArticlesPreviewProps {
  articles: Article[];
}

export function ArticlesPreview({ articles }: ArticlesPreviewProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Artículos Recientes"
          subtitle="Contenido educativo sobre salud mental"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <article className="group">
                {/* Image placeholder */}
                <div className="aspect-[16/10] bg-sand rounded-xl mb-4 flex items-center justify-center group-hover:bg-sage/10 transition-colors">
                  <span className="text-warm-gray-light text-xs">
                    [Imagen del artículo]
                  </span>
                </div>
                <p className="text-sage-dark text-sm font-medium mb-2">
                  {article.category}
                </p>
                <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-sage-dark transition-colors">
                  {article.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <p className="text-warm-gray-light text-xs mt-3">
                  {new Date(article.published_at).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="text-sage-dark font-medium hover:text-sage underline underline-offset-2 transition-colors"
          >
            Ver todos los artículos →
          </Link>
        </div>
      </div>
    </section>
  );
}
