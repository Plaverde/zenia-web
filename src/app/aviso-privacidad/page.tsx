import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad del sitio web de Zenia Álvarez Gulfo, psicóloga clínica en Montería.",
  alternates: {
    canonical: "/aviso-privacidad",
  },
};

export default function AvisoPrivacidadPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl text-charcoal mb-8">
              Aviso de privacidad
            </h1>

            <div className="prose prose-lg max-w-none text-warm-gray leading-relaxed space-y-6">
              <p>
                El presente aviso de privacidad describe cómo se recopilan,
                utilizan y protegen los datos personales de los usuarios del
                sitio web de Zenia Álvarez Gulfo, psicóloga clínica con
                consultorio en Montería, Córdoba, Colombia.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                Información que recopilamos
              </h2>
              <p>
                Recopilamos información personal que usted nos proporciona
                voluntariamente a través de nuestros formularios de contacto y
                reserva de citas, incluyendo: nombre, correo electrónico,
                número de teléfono, motivo de consulta y preferencias de
                atención.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                Uso de la información
              </h2>
              <p>
                La información recopilada se utiliza exclusivamente para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestionar citas y servicios de terapia psicológica.</li>
                <li>
                  Responder solicitudes de información y consultas.
                </li>
                <li>
                  Enviar información relevante sobre los servicios ofrecidos,
                  solo cuando haya sido solicitada.
                </li>
              </ul>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                Confidencialidad
              </h2>
              <p>
                La información proporcionada en el contexto de la relación
                terapéutica está sujeta al deber de confidencialidad
                establecido en el Código Deontológico de la Psicología en
                Colombia, la Ley 1581 de 2012 sobre protección de datos
                personales, y la Ley 2460 de 2025 en materia de salud mental.
                Esta información no será compartida con terceros,
                salvo en los casos previstos por la ley.
              </p>
              <p>
                Los datos relacionados con la salud mental son considerados
                datos personales sensibles conforme a la Ley 1581 de 2012,
                y gozan de una protección reforzada. Su tratamiento se
                realiza únicamente para los fines aquí descritos y con el
                consentimiento previo, libre e informado del titular.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                Cookies y tecnologías de rastreo
              </h2>
              <p>
                Este sitio web no utiliza cookies de rastreo ni tecnologías de
                seguimiento. No recopilamos información de navegación de forma
                automática.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                Enlaces a sitios de terceros
              </h2>
              <p>
                Este sitio puede contener enlaces a sitios web de terceros (por
                ejemplo, WhatsApp, Google Maps). No nos hacemos responsables de
                las prácticas de privacidad de dichos sitios. Le recomendamos
                revisar las políticas de privacidad de cada sitio que visite.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                Cambios en este aviso
              </h2>
              <p>
                Nos reservamos el derecho de actualizar este aviso de
                privacidad en cualquier momento. Los cambios serán publicados
                en esta página con su fecha de última actualización.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                Contacto
              </h2>
              <p>
                Para cualquier consulta sobre este aviso de privacidad o sobre
                el tratamiento de sus datos personales, puede comunicarse a
                través del formulario de contacto disponible en este sitio web.
              </p>

              <p className="text-warm-gray-light text-sm mt-8">
                Última actualización: julio de 2026
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
