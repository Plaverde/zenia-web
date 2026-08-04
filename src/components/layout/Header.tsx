"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const DOCTORALIA_URL = "https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo";

const navItems = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/terapia-online", label: "Terapia Online" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/recursos", label: "Recursos" },
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
              Agendar Sesión
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
                  Agendar Sesión
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      </header>

      {/* Mobile CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-sm border-t border-sand/50 p-3 md:hidden">
        <div className="flex items-center gap-3">
          <Button
            href={`https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            WhatsApp
          </Button>
          <Button href={DOCTORALIA_URL} size="sm" className="flex-1">
            Agendar Sesión
          </Button>
        </div>
      </div>
    </>
  );
}
