import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de administración | Zenia Álvarez Gulfo",
  description: "Panel de administración para gestión de citas, pacientes y contenido.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ivory">
      {children}
    </div>
  );
}
