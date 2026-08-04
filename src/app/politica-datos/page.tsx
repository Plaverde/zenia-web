import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Tratamiento de Datos Personales",
  description:
    "Conoce cómo Zenia Álvarez Gulfo trata y protege tus datos personales conforme a la Ley 1581 de 2012 de Colombia.",
};

export default function PoliticaDatosPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl text-charcoal mb-8">
              Política de Tratamiento de Datos Personales
            </h1>

            <div className="prose prose-lg max-w-none text-warm-gray leading-relaxed space-y-6">
              <p>
                <strong className="text-charcoal">Responsable del tratamiento:</strong> Zenia
                Álvarez Gulfo, psicóloga clínica, con consultorio en Cra 19
                #10-25 Centro, Montería, Córdoba, Colombia.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                1. Datos personales recopilados
              </h2>
              <p>
                A través de los formularios de contacto y de reserva de citas,
                podemos recopilar los siguientes datos personales: nombre
                completo, número de teléfono, correo electrónico, motivo de
                consulta, modalidad preferida (presencial o virtual), y
                cualquier información adicional que el usuario proporcione
                voluntariamente en el campo de notas.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                2. Finalidad del tratamiento
              </h2>
              <p>
                Los datos personales serán utilizados exclusivamente para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestionar y confirmar citas de terapia psicológica.</li>
                <li>
                  Enviar información relacionada con el servicio solicitado.
                </li>
                <li>
                  Responder consultas y solicitudes de información enviadas a
                  través del formulario de contacto.
                </li>
              </ul>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                3. Consentimiento
              </h2>
              <p>
                El tratamiento de datos personales se realiza con base en el
                consentimiento libre, previo, informado y expreso del titular,
                conforme al artículo 9 de la Ley 1581 de 2012. El usuario
                otorga su consentimiento al marcar la casilla correspondiente
                en los formularios de contacto y reserva.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                4. Derechos del titular
              </h2>
              <p>
                Conforme a la Ley 1581 de 2012, el titular de los datos
                personales tiene derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conocer, actualizar y rectificar sus datos personales.</li>
                <li>Solicitar prueba del consentimiento otorgado.</li>
                <li>
                  Ser informado sobre el uso de sus datos personales.
                </li>
                <li>
                  Revocar el consentimiento y/o solicitar la supresión de sus
                  datos.
                </li>
                <li>
                  Presentar quejas ante la Superintendencia de Industria y
                  Comercio (SIC) por incumplimiento de la normativa.
                </li>
              </ul>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                5. Seguridad de los datos
              </h2>
              <p>
                Se implementan medidas de seguridad administrativas, técnicas y
                físicas para proteger los datos personales contra acceso no
                autorizado, pérdida, alteración o uso indebido. Los datos se
                almacenan en sistemas seguros y su acceso está limitado
                exclusivamente a la profesional responsable.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                6. Conservación de los datos
              </h2>
              <p>
                Los datos personales serán conservados únicamente durante el
                tiempo necesario para cumplir con las finalidades para las que
                fueron recopilados, o mientras el titular no ejerza su derecho
                de supresión.
              </p>

              <h2 className="font-serif text-2xl text-charcoal mt-8">
                7. Contacto
              </h2>
              <p>
                Para ejercer sus derechos como titular de datos personales o
                para cualquier consulta relacionada con esta política, puede
                contactarse a través del formulario de contacto del sitio web
                o escribiendo directamente al correo electrónico de contacto.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
