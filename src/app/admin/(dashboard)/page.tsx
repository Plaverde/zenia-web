import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

async function getStats() {
  const [
    pendingAppointments,
    totalPatients,
    unreadMessages,
    publishedPosts,
    activeTestimonials,
  ] = await Promise.all([
    prisma.appointments.count({ where: { status: "pending" } }),
    prisma.patients_leads.count(),
    prisma.contact_messages.count({ where: { read: false } }),
    prisma.blog_posts.count({ where: { status: "published" } }),
    prisma.testimonials.count({ where: { active: true } }),
  ]);

  return {
    pendingAppointments,
    totalPatients,
    unreadMessages,
    publishedPosts,
    activeTestimonials,
  };
}

async function getRecentAppointments() {
  return prisma.appointments.findMany({
    take: 5,
    orderBy: { created_at: "desc" },
  });
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const stats = await getStats();
  const recentAppointments = await getRecentAppointments();

  const statCards = [
    {
      label: "Citas pendientes",
      value: stats.pendingAppointments,
      href: "/admin/citas",
      color: "bg-terracotta/10 text-terracotta",
    },
    {
      label: "Pacientes",
      value: stats.totalPatients,
      href: "/admin/pacientes",
      color: "bg-sage/10 text-sage",
    },
    {
      label: "Mensajes sin leer",
      value: stats.unreadMessages,
      href: "/admin/mensajes",
      color: "bg-sand text-charcoal",
    },
    {
      label: "Artículos publicados",
      value: stats.publishedPosts,
      href: "/admin/blog",
      color: "bg-sage-light/30 text-sage-dark",
    },
    {
      label: "Testimonios activos",
      value: stats.activeTestimonials,
      href: "/admin/testimonios",
      color: "bg-terracotta/10 text-terracotta",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal mb-8">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${stat.color} mb-3`}>
                {stat.label}
              </div>
              <div className="text-4xl font-bold text-charcoal">
                {stat.value}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-charcoal">
            Citas Recientes
          </h2>
          <Link
            href="/admin/citas"
            className="text-sage hover:text-sage-dark text-sm font-medium transition-colors"
          >
            Ver todas →
          </Link>
        </div>

        {recentAppointments.length === 0 ? (
          <p className="text-warm-gray text-center py-8">
            No hay citas registradas aún.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand">
                  <th className="text-left py-3 px-4 text-sm font-medium text-warm-gray">
                    Nombre
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-warm-gray">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-warm-gray">
                    Servicio
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-warm-gray">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-sand/50">
                    <td className="py-3 px-4 text-charcoal">
                      {apt.full_name}
                    </td>
                    <td className="py-3 px-4 text-warm-gray">
                      {new Date(apt.appointment_date).toLocaleDateString("es-CO")}
                    </td>
                    <td className="py-3 px-4 text-warm-gray">
                      {apt.service_type}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          apt.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : apt.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {apt.status === "pending"
                          ? "Pendiente"
                          : apt.status === "confirmed"
                          ? "Confirmada"
                          : "Cancelada"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
