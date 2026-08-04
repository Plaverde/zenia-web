"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/citas", label: "Citas", icon: "📅" },
  { href: "/admin/pacientes", label: "Pacientes", icon: "👥" },
  { href: "/admin/blog", label: "Recursos", icon: "📝" },
  { href: "/admin/faq", label: "FAQ", icon: "❓" },
  { href: "/admin/testimonios", label: "Testimonios", icon: "⭐" },
  { href: "/admin/mensajes", label: "Mensajes", icon: "✉️" },
  { href: "/admin/servicios", label: "Servicios", icon: "🛋️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white p-6 flex flex-col">
        <div className="mb-8">
          <Link href="/admin" className="font-serif text-xl text-white">
            Zenia Admin
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.href === "/admin"
                  ? pathname === item.href
                    ? "bg-sage text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                  : pathname.startsWith(item.href)
                  ? "bg-sage text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span>🌐</span>
            <span>Ver sitio web</span>
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
          >
            <span>🚪</span>
            <span className="ml-3">Cerrar sesión</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
