"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoctoraliaWidget, DoctoraliaButton } from "@/components/DoctoraliaWidget";

export default function TarifasPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        {/* Tarifas */}
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading as="h1"
              title="Tarifas"
              subtitle="Transparencia en los valores del servicio psicológico"
            />

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-8 border border-sand/50">
                <h3 className="font-serif text-2xl text-charcoal mb-2">
                  Sesión Individual
                </h3>
                <p className="text-warm-gray text-sm mb-4">
                  Terapia individual para adultos (50 minutos)
                </p>
                <p className="text-3xl font-bold text-sage-dark mb-4">
                  Consultar valor
                </p>
                <ul className="space-y-2 text-sm text-warm-gray list-disc list-inside">
                  <li>Presencial o virtual</li>
                  <li>Evaluación inicial incluida</li>
                  <li>Plan de tratamiento personalizado</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-sand/50">
                <h3 className="font-serif text-2xl text-charcoal mb-2">
                  Terapia de Pareja
                </h3>
                <p className="text-warm-gray text-sm mb-4">
                  Sesión para parejas (75 minutos)
                </p>
                <p className="text-3xl font-bold text-sage-dark mb-4">
                  Consultar valor
                </p>
                <ul className="space-y-2 text-sm text-warm-gray list-disc list-inside">
                  <li>Presencial o virtual</li>
                  <li>Evaluación de la dinámica de pareja</li>
                  <li>Estrategias de comunicación</li>
                </ul>
              </div>
            </div>

            {/* Planes de acompañamiento */}
            <div className="bg-sage/5 rounded-2xl p-8 mb-16">
              <h3 className="font-serif text-2xl text-charcoal mb-4 text-center">
                Planes de Acompañamiento
              </h3>
              <p className="text-warm-gray text-center mb-6 max-w-2xl mx-auto">
                Para quienes buscan continuidad en el proceso terapéutico. Los
                planes tienen una vigencia de 3 meses desde la primera sesión.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { sessions: "4 sesiones", benefit: "Seguimiento cercano" },
                  { sessions: "8 sesiones", benefit: "Continuidad terapéutica" },
                  { sessions: "12 sesiones", benefit: "Proceso consolidado" },
                ].map((plan) => (
                  <div key={plan.sessions} className="bg-white rounded-xl p-6 text-center border border-sand/50">
                    <p className="font-medium text-charcoal mb-1">{plan.sessions}</p>
                    <p className="text-sage-dark font-semibold">{plan.benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formas de pago */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                Formas de pago
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-sand/50">
                  <svg className="w-5 h-5 text-sage-dark flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-warm-gray text-sm">Transferencia bancaria</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-sand/50">
                  <svg className="w-5 h-5 text-sage-dark flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-warm-gray text-sm">Pago móvil (Nequi, Daviplata)</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-sand/50">
                  <svg className="w-5 h-5 text-sage-dark flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-warm-gray text-sm">Efectivo (presencial)</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-sand/50">
                  <svg className="w-5 h-5 text-sage-dark flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-warm-gray text-sm">Consultar valor según servicio</span>
                </div>
              </div>
            </div>

            {/* Políticas */}
            <div className="bg-white rounded-2xl p-8 border border-sand/50 mb-16">
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                Políticas de atención
              </h3>
              <div className="space-y-4 text-warm-gray">
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Reprogramaciones</h4>
                  <p className="text-sm">
                    Puedes reprogramar tu cita con al menos 24 horas de anticipación,
                    sin costo adicional.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Cancelaciones</h4>
                  <p className="text-sm">
                    Las cancelaciones con menos de 24 horas de anticipación tendrán
                    un cargo del 50% del valor de la sesión.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Inasistencia</h4>
                  <p className="text-sm">
                    En caso de inasistencia sin previo aviso, se cobrará el 100%
                    del valor de la sesión.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Primera sesión</h4>
                  <p className="text-sm">
                    La primera sesión funciona como evaluación inicial. No hay
                    compromiso de continuar si no te sientes cómodo/a.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reserva con Doctoralia */}
        <section className="py-20 bg-white scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeading
              title="Reserva tu cita"
              subtitle="Agenda tu sesión de forma segura a través de Doctoralia"
            />

            <div className="bg-ivory rounded-2xl p-8 border border-sand/50 shadow-sm">
              <p className="text-warm-gray mb-8 leading-relaxed">
                Puedes reservar tu cita directamente desde mi perfil de Doctoralia.
                Selecciona la fecha y hora que mejor se adapten a tu disponibilidad.
              </p>

              <div className="flex flex-col items-center gap-6">
                <DoctoraliaWidget />

                <p className="text-sm text-warm-gray-light">
                  Si prefieres, también puedes{" "}
                  <DoctoraliaButton className="text-sage-dark underline underline-offset-2 hover:text-charcoal">
                    ver el perfil completo en Doctoralia
                  </DoctoraliaButton>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
