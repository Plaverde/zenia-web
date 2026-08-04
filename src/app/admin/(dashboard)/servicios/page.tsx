"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";

interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string | null;
  price: string | null;
  active: boolean;
  order: number;
}

export default function ServiciosAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setServices(data);
    } catch {
      toast.error("Error", { description: "No se pudieron cargar los servicios." });
    } finally {
      setIsLoading(false);
    }
  }

  async function saveService(service: Partial<Service>) {
    try {
      const method = service.id ? "PATCH" : "POST";
      const url = service.id
        ? `/api/admin/services/${service.id}`
        : "/api/admin/services";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });

      if (!res.ok) throw new Error("Error");

      toast.success("Guardado", { description: "Servicio actualizado correctamente." });
      setShowNew(false);
      setEditingId(null);
      fetchServices();
    } catch {
      toast.error("Error", { description: "No se pudo guardar el servicio." });
    }
  }

  async function deleteService(id: number) {
    if (!confirm("¿Eliminar este servicio?")) return;
    try {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      toast.success("Eliminado", { description: "Servicio eliminado correctamente." });
      fetchServices();
    } catch {
      toast.error("Error", { description: "No se pudo eliminar el servicio." });
    }
  }

  async function toggleActive(service: Service) {
    await saveService({ ...service, active: !service.active });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-charcoal">Gestión de Servicios</h1>
        <Button variant="primary" onClick={() => setShowNew(true)}>
          Nuevo Servicio
        </Button>
      </div>

      {showNew && (
        <Card className="p-6 mb-6">
          <h3 className="font-medium text-charcoal mb-4">Nuevo Servicio</h3>
          <ServiceForm onSave={saveService} onCancel={() => setShowNew(false)} />
        </Card>
      )}

      {isLoading ? (
        <p className="text-warm-gray text-center py-8">Cargando servicios...</p>
      ) : services.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-warm-gray">No hay servicios creados.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="p-6">
              {editingId === service.id ? (
                <ServiceForm
                  service={service}
                  onSave={saveService}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-charcoal">{service.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          service.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {service.active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <p className="text-sm text-warm-gray line-clamp-2">{service.description}</p>
                    {(service.duration || service.price) && (
                      <div className="text-sm text-warm-gray-light mt-2">
                        {service.duration && <span>⏱ {service.duration}</span>}
                        {service.duration && service.price && <span> | </span>}
                        {service.price && <span>💰 {service.price}</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleActive(service)}
                      variant="ghost"
                      size="sm"
                    >
                      {service.active ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      onClick={() => setEditingId(service.id)}
                      variant="outline"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => deleteService(service.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service?: Service;
  onSave: (service: Partial<Service>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [duration, setDuration] = useState(service?.duration || "");
  const [price, setPrice] = useState(service?.price || "");

  return (
    <div className="space-y-4">
      <Input
        label="Título"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        label="Descripción"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Duración"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="ej: 50 minutos"
        />
        <Input
          label="Precio"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ej: $80.000"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onSave({ ...service, title, description, duration, price })}
        >
          Guardar
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
