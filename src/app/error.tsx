"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const whatsappUrl = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(
    SITE.whatsappMessage
  )}`;

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <section className="py-24 bg-ivory">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-terracotta/20 text-charcoal text-sm font-medium mb-5">
              Algo salió mal
            </span>
            <h1 className="font-serif text-4xl text-charcoal mb-4">
              Ocurrió un error inesperado
            </h1>
            <p className="text-warm-gray leading-relaxed mb-8">
              No fue posible cargar esta página. Puedes intentarlo de nuevo o
              escribirme directamente y seguimos por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} size="lg">
                Intentar de nuevo
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
