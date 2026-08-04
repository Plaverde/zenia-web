"use client";

import { useEffect } from "react";

const DOCTORALIA_PROFILE = "https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo";

export function DoctoraliaWidget() {
  useEffect(() => {
    // Evitar cargar el script de Doctoralia más de una vez
    if (document.getElementById("zl-widget-s")) return;

    const js = document.createElement("script");
    js.id = "zl-widget-s";
    js.src = "https://platform.docplanner.com/js/widget.js";
    js.async = true;

    const scripts = document.getElementsByTagName("script");
    const firstScript = scripts[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(js, firstScript);
    } else {
      document.body.appendChild(js);
    }
  }, []);

  return (
    <a
      id="zl-url"
      className="zl-url inline-block"
      href={DOCTORALIA_PROFILE}
      rel="nofollow"
      data-zlw-doctor="zenia-maria-alvarez-gulfo"
      data-zlw-type="big"
      data-zlw-opinion="false"
      data-zlw-hide-branding="true"
      data-zlw-saas-only="true"
      data-zlw-a11y-title="Widget de reserva de citas médicas"
    >
      Reservar una cita
    </a>
  );
}

export function DoctoraliaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={DOCTORALIA_PROFILE}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
