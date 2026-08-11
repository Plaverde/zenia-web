import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScreeningFlow } from "@/components/screening/ScreeningFlow";

export const metadata: Metadata = {
  title: "Autoevaluación de ansiedad y depresión · Psicóloga en Montería",
  description:
    "Cuestionarios orientativos PHQ-9 y GAD-7 para reflexionar sobre tu estado de ánimo y tu ansiedad, en línea y sin guardar tus respuestas. Son orientativos: no constituyen un diagnóstico ni reemplazan la atención de una psicóloga en Montería.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/autoevaluacion",
  },
};

export default function AutoevaluacionPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ScreeningFlow />
      </main>
      <Footer />
    </>
  );
}
