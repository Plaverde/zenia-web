"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const DOCTORALIA_URL = "https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo";

const navItems = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/terapia-online", label: "Terapia online" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/recursos", label: "Recursos" },
  { href: "/autoevaluacion", label: "Autoevaluación" },
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl text-charcoal hover:text-sage-dark transition-colors"
          >
            Zenia Álvarez Gulfo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-warm-gray hover:text-sage-dark transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button href={DOCTORALIA_URL} size="sm" className="hidden sm:inline-flex">
              Agendar sesión
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-sage-dark transition-colors"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            className="md:hidden py-4 border-t border-sand"
            aria-label="Navegación móvil"
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-warm-gray hover:text-sage-dark hover:bg-sage/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-2">
                <Button href={DOCTORALIA_URL} className="w-full">
                  Agendar sesión
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      </header>

      {/* Mobile CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-sm border-t border-sand/50 px-2 py-2 md:hidden">
        <div className="flex items-stretch gap-1.5">
          <Link
            href="/autoevaluacion"
            className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[52px] rounded-lg text-sage-dark hover:bg-sage/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 14 2 2 4-4" />
            </svg>
            <span className="text-[11px] font-medium leading-tight">
              Autoevaluación
            </span>
          </Link>
          <a
            href={`https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[52px] rounded-lg text-sage-dark hover:bg-sage/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="text-[11px] font-medium leading-tight">
              WhatsApp
            </span>
          </a>
          <a
            href={DOCTORALIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[52px] rounded-lg bg-sage-dark text-white hover:bg-terracotta-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="text-[11px] font-medium leading-tight">
              Agendar
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
