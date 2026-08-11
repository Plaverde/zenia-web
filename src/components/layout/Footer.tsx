import Link from "next/link";
import { SITE } from "@/lib/constants";

const DOCTORALIA_URL = "https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo";

const footerLinks = {
  servicios: [
    { href: "/especialidades", label: "Especialidades" },
    { href: "/terapia-online", label: "Terapia Online" },
    { href: "/tarifas", label: "Tarifas" },
  ],
  información: [
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/recursos", label: "Recursos" },
    { href: "/blog", label: "Blog" },
    { href: "/autoevaluacion", label: "Autoevaluación" },
    { href: "/faq", label: "Preguntas frecuentes" },
    { href: "/contacto", label: "Contacto" },
  ],
  legal: [
    { href: "/derechos-personas", label: "Derechos de las personas" },
    { href: "/politica-datos", label: "Política de datos" },
    { href: "/aviso-privacidad", label: "Aviso de privacidad" },
    { href: "/terminos-de-uso", label: "Términos de uso" },
    { href: "/consentimiento-informado", label: "Consentimiento informado" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl text-white mb-4 block">
              {SITE.name}
            </Link>
            <p className="text-warm-gray-light text-sm leading-relaxed mb-4">
              Psicóloga Clínica en Montería, Córdoba. Especialista en ansiedad y
              depresión con terapias de tercera generación.
            </p>
            <p className="text-warm-gray-light text-sm mb-2">
              {SITE.address}
            </p>
            <p className="text-warm-gray-light text-xs">
              Reg. Profesional: {SITE.registrationNumber}
            </p>
            <p className="text-warm-gray-light text-xs">
              Reg. REPS: {SITE.repsNumber}
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-medium text-white mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-gray-light hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-medium text-white mb-4">Información</h3>
            <ul className="space-y-3">
              {footerLinks.información.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-gray-light hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contacto */}
          <div>
            <h3 className="font-medium text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-warm-gray-light">
              <li>
                <a
                  href={DOCTORALIA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Reservar cita en Doctoralia
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>

            <h3 className="font-medium text-white mt-6 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-gray-light hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-warm-gray/30">
          {/* Identificación legal */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-white text-sm font-medium mb-2">
                Identificación Legal
              </h4>
              <p className="text-warm-gray-light text-xs leading-relaxed">
                {SITE.name} · {SITE.profession}
                <br />
                NIT/DNI: [NIT_O_DNI]
                <br />
                Reg. Profesional: {SITE.registrationNumber}
                <br />
                Reg. REPS: {SITE.repsNumber}
                <br />
                {SITE.licenseInfo}
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-2">
                Derechos y Deberes del Paciente
              </h4>
              <p className="text-warm-gray-light text-xs leading-relaxed">
                Conforme a la{" "}
                <Link href="/derechos-personas" className="text-sage-light hover:text-white transition-colors underline">
                  Ley 1616 de 2013
                </Link>{" "}
                y la{" "}
                <Link href="/derechos-personas" className="text-sage-light hover:text-white transition-colors underline">
                  Ley 2460 de 2025
                </Link>
                , tienes derecho a recibir atención en salud mental libre de discriminación, con confidencialidad y respeto a tu autonomía.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
            <p className="text-white text-sm font-medium mb-1">
              Emergencias de salud mental
            </p>
            <p className="text-warm-gray-light text-xs">
              Línea 106 (Salud Mental) · Línea 123 (Línea de la Vida) · SAMU 125
            </p>
          </div>
          <p className="text-warm-gray-light text-sm text-center">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos
            reservados.
          </p>
          <p className="text-warm-gray text-xs text-center mt-2">
            Este sitio web es de carácter informativo y no reemplaza la atención
            profesional personalizada.
          </p>
        </div>
      </div>
    </footer>
  );
}
