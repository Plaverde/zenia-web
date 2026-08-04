import { prisma } from "@/lib/db";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function TestimonialsPreview() {
  let testimonials: { patient_name: string; content: string; rating: number }[] = [];

  try {
    testimonials = await prisma.testimonials.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      take: 3,
      select: {
        patient_name: true,
        content: true,
        rating: true,
      },
    });
  } catch {
    return null;
  }

  if (testimonials.length === 0) return null;

  function renderStars(rating: number) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Lo que dicen mis pacientes"
          subtitle="Testimonios de personas que han confiado en este proceso de acompañamiento"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-sand/50 shadow-sm"
            >
              <p className="text-terracotta text-sm mb-3">{renderStars(t.rating)}</p>
              <p className="text-warm-gray text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <p className="text-charcoal font-medium text-sm">{t.patient_name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
