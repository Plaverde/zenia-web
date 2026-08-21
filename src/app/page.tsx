import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { ProfessionalProfile } from "@/components/sections/ProfessionalProfile";
import { TriageAssistant } from "@/components/sections/TriageAssistant";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SpecialtiesGrid } from "@/components/sections/SpecialtiesGrid";
import { SelfAssessmentSection } from "@/components/sections/SelfAssessmentSection";
import { FirstSession } from "@/components/sections/FirstSession";
import { TestimonialsPreview } from "@/components/sections/TestimonialsPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { CTASection } from "@/components/sections/CTASection";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
};

async function getLatestArticles(): Promise<Article[]> {
  try {
    const articles = await prisma.blog_posts.findMany({
      where: { status: "published" },
      orderBy: { published_at: "desc" },
      take: 3,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        published_at: true,
      },
    });
    return articles.map((a: { slug: string; title: string; excerpt: string; category: string; published_at: Date | null }) => ({
      ...a,
      published_at: a.published_at?.toISOString() || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const articles = await getLatestArticles();

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <Hero />
        <ProfessionalProfile />
        <TriageAssistant />
        <ServicesGrid />
        <SpecialtiesGrid />
        <SelfAssessmentSection />
        <FirstSession />
        <TestimonialsPreview />
        <ArticlesPreview articles={articles} />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
