"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { toast } from "sonner";

interface Patient {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  consultation_reason: string | null;
  preferred_modality: string | null;
  source: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export default function PacientesPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/patients");
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setPatients(data);
    } catch {
      toast.error("Error", { description: "No se pudieron cargar los pacientes." });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    const labels: Record<string, string> = {
      contacted: "marcar como contactado",
      active: "marcar como activo",
      archived: "archivar",
    };
    if (!confirm(`¿${labels[status] || "cambiar estado"}?`)) return;
    try {
      const res = await fetch(`/api/admin/patients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Error");

      toast.success("Estado actualizado");
      fetchPatients();
    } catch {
      toast.error("Error", { description: "No se pudo actualizar el paciente." });
    }
  }

  const filtered = filter === "all"
    ? patients
    : patients.filter((p) => p.status === filter);

  const statusOptions = [
    { value: "all", label: "Todos" },
    { value: "new", label: "Nuevos" },
    { value: "contacted", label: "Contactados" },
    { value: "active", label: "Activos" },
    { value: "archived", label: "Archivados" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-charcoal">Gestión de pacientes</h1>
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
        <p className="text-warm-gray text-center py-8">Cargando pacientes...</p>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-warm-gray">No hay pacientes {filter !== "all" ? "con este filtro" : "registrados"}.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((patient) => (
            <Card key={patient.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-charcoal">{patient.full_name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : patient.status === "contacted"
                          ? "bg-yellow-100 text-yellow-800"
                          : patient.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status === "new"
                        ? "Nuevo"
                        : patient.status === "contacted"
                        ? "Contactado"
                        : patient.status === "active"
                        ? "Activo"
                        : "Archivado"}
                    </span>
                  </div>
                  <div className="text-sm text-warm-gray space-y-1">
                    <p>📱 {patient.phone} | {patient.email || "Sin email"}</p>
                    <p>Fuente: {patient.source} | Modalidad: {patient.preferred_modality || "No especificada"}</p>
                    {patient.consultation_reason && (
                      <p className="italic">Motivo: {patient.consultation_reason}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {patient.status === "new" && (
                    <Button
                      onClick={() => updateStatus(patient.id, "contacted")}
                      variant="primary"
                      size="sm"
                    >
                      Marcar contactado
                    </Button>
                  )}
                  {patient.status === "contacted" && (
                    <Button
                      onClick={() => updateStatus(patient.id, "active")}
                      variant="primary"
                      size="sm"
                    >
                      Marcar activo
                    </Button>
                  )}
                  {patient.status !== "archived" && (
                    <Button
                      onClick={() => updateStatus(patient.id, "archived")}
                      variant="outline"
                      size="sm"
                    >
                      Archivar
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
