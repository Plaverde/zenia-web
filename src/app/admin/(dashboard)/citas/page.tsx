"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { toast } from "sonner";

interface Appointment {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  modality: string;
  status: string;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
}

export default function CitasPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setAppointments(data);
    } catch {
      toast.error("Error", { description: "No se pudieron cargar las citas." });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    const label = status === "confirmed" ? "confirmar" : "cancelar";
    if (!confirm(`¿${label.charAt(0).toUpperCase() + label.slice(1)} esta cita?`)) return;
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Error");

      toast.success("Estado actualizado", {
        description: `Cita ${status === "confirmed" ? "confirmada" : status === "cancelled" ? "cancelada" : "actualizada"}.`,
      });
      fetchAppointments();
    } catch {
      toast.error("Error", { description: "No se pudo actualizar la cita." });
    }
  }

  const filtered = filter === "all"
    ? appointments
    : appointments.filter((a) => a.status === filter);

  const statusOptions = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "Pendientes" },
    { value: "confirmed", label: "Confirmadas" },
    { value: "cancelled", label: "Canceladas" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-charcoal">Gestión de Citas</h1>
        <div className="w-48">
          <Select
            id="filter"
            label=""
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-warm-gray text-center py-8">Cargando citas...</p>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-warm-gray">No hay citas {filter !== "all" ? "con este filtro" : "registradas"}.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((apt) => (
            <Card key={apt.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-charcoal">{apt.full_name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                  </div>
                  <div className="text-sm text-warm-gray space-y-1">
                    <p>
                      📅 {new Date(apt.appointment_date).toLocaleDateString("es-CO")} a las {apt.appointment_time}
                    </p>
                    <p>🛋️ {apt.service_type} | {apt.modality}</p>
                    <p>📧 {apt.email} | 📱 {apt.phone}</p>
                    {apt.notes && <p className="italic">&ldquo;{apt.notes}&rdquo;</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {apt.status === "pending" && (
                    <>
                      <Button
                        onClick={() => updateStatus(apt.id, "confirmed")}
                        variant="primary"
                        size="sm"
                      >
                        Confirmar
                      </Button>
                      <Button
                        onClick={() => updateStatus(apt.id, "cancelled")}
                        variant="outline"
                        size="sm"
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                  {apt.status === "confirmed" && (
                    <Button
                      onClick={() => updateStatus(apt.id, "cancelled")}
                      variant="outline"
                      size="sm"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
