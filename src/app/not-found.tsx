import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const whatsappUrl = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(
    SITE.whatsappMessage
  )}`;

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <section className="py-24 bg-ivory">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage-dark text-sm font-medium mb-5">
              Error 404
            </span>
            <h1 className="font-serif text-4xl text-charcoal mb-4">
              No encontramos esta página
            </h1>
            <p className="text-warm-gray leading-relaxed mb-8">
              Puede que el enlace esté roto o que la página se haya movido. Si
              buscabas algo en particular, escríbeme y te ayudo a
              encontrarlo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/" size="lg">
                Volver al inicio
              </Button>
              <Button href={whatsappUrl} variant="outline" size="lg">
                Escribir por WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
