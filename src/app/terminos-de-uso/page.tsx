import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Términos de uso",
  description:
    "Términos y condiciones de uso del sitio web de Zenia Álvarez Gulfo, psicóloga clínica en Montería.",
};

export default function TerminosDeUsoPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl text-charcoal mb-8">
              Términos de uso
            </h1>

            <div className="prose prose-lg max-w-none text-warm-gray leading-relaxed space-y-6">
              <p>
                El presente documento establece los términos y condiciones de
                uso del sitio web de Zenia Álvarez Gulfo, psicóloga clínica con
                consultorio en Montería, Córdoba, Colombia. Al acceder y
                utilizar este sitio web, usted acepta estos términos en su
                totalidad.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                1. Naturaleza del sitio
              </h2>
              <p>
                Este sitio web es de carácter informativo y educativo. Su
                propósito es proporcionar información sobre los servicios de
                psicoterapia ofrecidos por Zenia Álvarez Gulfo, así como
                contenido educativo relacionado con la salud mental.
              </p>
              <p>
                <strong className="text-charcoal">
                  Este sitio web no constituye, ni sustituye, una consulta
                  psicológica, diagnóstico ni tratamiento profesional
                  personalizado.
                </strong>{" "}
                La información aquí publicada no reemplaza la evaluación de un
                profesional de la salud mental.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                2. Contenido educativo
              </h2>
              <p>
                Los artículos, textos y demás contenidos publicados en el blog
                y en las páginas de este sitio tienen un propósito exclusivamente
                pedagógico e informativo. Están elaborados conforme a las
                mejores prácticas y a la evidencia científica disponible, pero
                no pretenden abordar todas las situaciones individuales.
              </p>
              <p>
                Si usted se identifica con algún contenido publicado, le
                recomendamos agendar una sesión profesional para una evaluación
                personalizada, en lugar de intentar aplicar por su cuenta las
                herramientas o conceptos descritos.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                3. Limitación de responsabilidad
              </h2>
              <p>
                Zenia Álvarez Gulfo no se hace responsable por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Decisiones tomadas con base en la información publicada en
                  este sitio web.
                </li>
                <li>
                  Daños directos o indirectos derivados del uso o imposibilidad
                  de uso de este sitio.
                </li>
                <li>
                  Contenido de sitios web de terceros a los que se pueda acceder
                  a través de enlaces en este sitio.
                </li>
                <li>
                  Interrupciones, errores o virus que pudieran afectar el
                  funcionamiento del sitio.
                </li>
              </ul>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                4. Propiedad intelectual
              </h2>
              <p>
                Todo el contenido original de este sitio web (textos, imágenes,
                diseño, código) está protegido por las leyes de propiedad
                intelectual de Colombia. Queda prohibida su reproducción,
                distribución o modificación sin autorización previa por escrito.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                5. Uso aceptable
              </h2>
              <p>
                Al utilizar este sitio, usted se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Utilizar el sitio de conformidad con la ley y estos términos.
                </li>
                <li>
                  No intentar acceder no autorizado a áreas restringidas del
                  sitio o sistemas conectados.
                </li>
                <li>
                  No utilizar el sitio para fines ilícitos o que puedan dañar
                  la reputación o los derechos de terceros.
                </li>
              </ul>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                6. Enlaces externos
              </h2>
              <p>
                Este sitio puede contener enlaces a sitios web de terceros
                (por ejemplo, WhatsApp para contacto). Estos enlaces se
                proporcionan únicamente para su conveniencia. No nos
                responsabilizamos por el contenido, políticas de privacidad
                o prácticas de dichos sitios.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                7. Protección de datos personales
              </h2>
              <p>
                El tratamiento de sus datos personales se rige por nuestra{" "}
                <a href="/politica-datos" className="text-sage-dark hover:text-charcoal underline underline-offset-2">
                  Política de tratamiento de datos personales
                </a>{" "}
                y nuestro{" "}
                <a href="/aviso-privacidad" className="text-sage-dark hover:text-charcoal underline underline-offset-2">
                  Aviso de privacidad
                </a>
                , en cumplimiento de la Ley 1581 de 2012 y la Ley 2460 de 2025.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                8. Emergencias
              </h2>
              <p>
                Si usted o alguien que conoce está experimentando una emergencia
                de salud mental, no utilice este sitio web. Contacte
                inmediatamente la{" "}
                <strong className="text-charcoal">Línea 106</strong> (Salud
                Mental), la{" "}
                <strong className="text-charcoal">Línea 123</strong> (Línea de
                la Vida), llame al{" "}
                <strong className="text-charcoal">125</strong> (SAMU) o acuda a
                la sala de urgencias más cercana.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                9. Cambios en los términos
              </h2>
              <p>
                Nos reservamos el derecho de modificar estos términos de uso
                en cualquier momento. Los cambios serán publicados en esta
                página con su fecha de última actualización. El uso continuado
                del sitio después de los cambios constituye la aceptación de
                los nuevos términos.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                10. Legislación aplicable
              </h2>
              <p>
                Estos términos se rigen por las leyes de la República de
                Colombia. Para cualquier controversia derivada del uso de este
                sitio, las partes se someten a la jurisdicción de los
                tribunales competentes en Montería, Córdoba, Colombia.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                11. Contacto
              </h2>
              <p>
                Para cualquier consulta sobre estos términos de uso, puede
                comunicarse a través del formulario de contacto disponible
                en este sitio web.
              </p>

              <p className="text-warm-gray-light text-sm mt-8">
                Última actualización: Julio 2026
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
