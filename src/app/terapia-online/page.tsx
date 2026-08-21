import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmergencyBanner } from "@/components/ui/EmergencyBanner";

export const metadata: Metadata = {
  title: "Terapia online",
  description:
    "Conoce cómo funciona la terapia online con Zenia Álvarez Gulfo. Sesiones por videollamada segura con la misma calidad y confidencialidad que una sesión presencial.",
};

const checklist = [
  { icon: "🏠", text: "Un lugar privado donde te sientas cómodo/a" },
  { icon: "📶", text: "Buena conexión a internet" },
  { icon: "🎧", text: "Audífonos o auriculares" },
  { icon: "📹", text: "Cámara funcionando correctamente" },
  { icon: "⏰", text: "Un tiempo sin interrupciones (50 minutos)" },
];

export default function TerapiaOnlinePage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sage-dark font-medium mb-2">Terapia online</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
              Tu terapia desde donde te encuentres
            </h1>
            <p className="text-xl text-warm-gray leading-relaxed mb-8">
              La terapia online por videollamada ofrece la misma calidad y
              confidencialidad que una sesión presencial, con la comodidad de
              elegir tu espacio.
            </p>
            <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" size="lg">
              Agendar sesión Online
            </Button>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Cómo funciona"
              subtitle="El proceso terapéutico online es igual de efectivo que el presencial"
            />

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Agenda tu cita</h3>
                <p className="text-warm-gray text-sm">
                  Elige la fecha, hora y modalidad virtual. Recibirás la confirmación
                  por WhatsApp o correo electrónico.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Recibe el enlace</h3>
                <p className="text-warm-gray text-sm">
                  Te enviaré un enlace seguro por videollamada. Solo necesitas hacer
                  clic en el enlace a la hora acordada.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Inicia tu sesión</h3>
                <p className="text-warm-gray text-sm">
                  Conéctate desde un lugar privado y cómodo. La sesión dura 50 minutos,
                  igual que en consultorio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plataformas */}
        <section className="py-16 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Plataformas seguras"
              subtitle="Utilizo herramientas con cifrado de extremo a extremo diseñadas para atención en salud"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-sand/50">
                <h3 className="font-medium text-charcoal mb-2">Doxy.me</h3>
                <p className="text-warm-gray text-sm">
                  Plataforma de videollamada diseñada específicamente para profesionales
                  de salud. No requiere descarga ni registro. Cifrado de extremo a extremo.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-sand/50">
                <h3 className="font-medium text-charcoal mb-2">Zoom for Healthcare</h3>
                <p className="text-warm-gray text-sm">
                  Versión de Zoom cumple con HIPAA y normativas de salud. Cifrado
                  de extremo a extremo y protección de datos sensibles.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-warm-gray italic">
              * No se utilizan aplicaciones generalistas (WhatsApp, Meet, etc.) porque no
              cumplen con los requisitos sanitarios para la protección de datos clínicos.
            </p>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Prepara tu espacio"
              subtitle="Antes de iniciar la sesión, verifica que cuentes con lo siguiente"
            />

            <div className="max-w-2xl mx-auto space-y-4">
              {checklist.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-ivory rounded-xl p-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-charcoal">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="py-16 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Ventajas de la terapia online"
              subtitle="Beneficios que la hacen una excelente opción"
            />

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Comodidad", desc: "Asiste desde tu hogar, oficina o cualquier lugar privado" },
                { title: "Ahorro de tiempo", desc: "Sin desplazamientos ni tráfico" },
                { title: "Flexibilidad", desc: "Horarios más amplios adaptados a tu rutina" },
                { title: "Accesibilidad", desc: "Ideal si vives fuera de Montería o tienes movilidad reducida" },
                { title: "Confidencialidad", desc: "Mismos protocolos éticos que la atención presencial" },
                { title: "Continuidad", desc: "Mantén tu proceso terapéutico sin interrupciones" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sage-dark text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">{item.title}</h3>
                    <p className="text-warm-gray text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protocolo de emergencia */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-charcoal mb-4">
              Protocolo de emergencia
            </h2>
            <p className="text-warm-gray leading-relaxed mb-6">
              Si durante la sesión presentas una crisis emocional severa, autolesión o
              pensamientos suicidas, se activará el protocolo de emergencia:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-terracotta/10 rounded-2xl p-6">
                <h3 className="font-medium text-charcoal mb-2">🇨🇴 Colombia</h3>
                <p className="text-warm-gray text-sm mb-2">Línea de emergencias: <strong>123</strong></p>
                <p className="text-warm-gray text-sm mb-2">Línea 106 (Salud Mental): <strong>106</strong></p>
                <p className="text-warm-gray text-sm">SAMU: <strong>125</strong></p>
              </div>
              <div className="bg-terracotta/10 rounded-2xl p-6">
                <h3 className="font-medium text-charcoal mb-2">📞 Contacto directo</h3>
                <p className="text-warm-gray text-sm mb-2">En caso de crisis durante la sesión, te orientaré hacia los recursos de emergencia más cercanos.</p>
                <p className="text-warm-gray text-sm">Si es una emergencia inmediata, llama al <strong>123</strong>.</p>
              </div>
            </div>

            <EmergencyBanner />
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 bg-sage-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              ¿Listo/a para iniciar tu terapia online?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Da el primer paso. Agenda tu primera sesión virtual y descubre cómo la
              terapia online puede adaptarse a tu vida.
            </p>
            <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" variant="secondary" size="lg">
              Agendar sesión Online
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
