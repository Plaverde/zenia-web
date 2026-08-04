"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";

interface Testimonial {
  id: number;
  patient_name: string;
  content: string;
  rating: number;
  active: boolean;
  order: number;
}

export default function TestimoniosAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setTestimonials(data);
    } catch {
      toast.error("Error", { description: "No se pudieron cargar los testimonios." });
    } finally {
      setIsLoading(false);
    }
  }

  async function saveTestimonial(testimonial: Partial<Testimonial>) {
    try {
      const method = testimonial.id ? "PATCH" : "POST";
      const url = testimonial.id
        ? `/api/admin/testimonials/${testimonial.id}`
        : "/api/admin/testimonials";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonial),
      });

      if (!res.ok) throw new Error("Error");

      toast.success("Guardado", { description: "Testimonio actualizado correctamente." });
      setShowNew(false);
      setEditingId(null);
      fetchTestimonials();
    } catch {
      toast.error("Error", { description: "No se pudo guardar el testimonio." });
    }
  }

  async function deleteTestimonial(id: number) {
    if (!confirm("¿Eliminar este testimonio?")) return;
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      toast.success("Eliminado", { description: "Testimonio eliminado correctamente." });
      fetchTestimonials();
    } catch {
      toast.error("Error", { description: "No se pudo eliminar el testimonio." });
    }
  }

  async function toggleActive(testimonial: Testimonial) {
    await saveTestimonial({ ...testimonial, active: !testimonial.active });
  }

  function renderStars(rating: number) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-charcoal">Gestión de Testimonios</h1>
        <Button variant="primary" onClick={() => setShowNew(true)}>
          Nuevo Testimonio
        </Button>
      </div>

      {showNew && (
        <Card className="p-6 mb-6">
          <h3 className="font-medium text-charcoal mb-4">Nuevo Testimonio</h3>
          <TestimonialForm
            onSave={saveTestimonial}
            onCancel={() => setShowNew(false)}
          />
        </Card>
      )}

      {isLoading ? (
        <p className="text-warm-gray text-center py-8">Cargando testimonios...</p>
      ) : testimonials.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-warm-gray">No hay testimonios creados aún.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              {editingId === testimonial.id ? (
                <TestimonialForm
                  testimonial={testimonial}
                  onSave={saveTestimonial}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-charcoal">
                        {testimonial.patient_name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          testimonial.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {testimonial.active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <p className="text-terracotta text-sm mb-2">
                      {renderStars(testimonial.rating)}
                    </p>
                    <p className="text-sm text-warm-gray line-clamp-2">
                      {testimonial.content}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleActive(testimonial)}
                      variant="ghost"
                      size="sm"
                    >
                      {testimonial.active ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      onClick={() => setEditingId(testimonial.id)}
                      variant="outline"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => deleteTestimonial(testimonial.id)}
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

function TestimonialForm({
  testimonial,
  onSave,
  onCancel,
}: {
  testimonial?: Testimonial;
  onSave: (testimonial: Partial<Testimonial>) => void;
  onCancel: () => void;
}) {
  const [patientName, setPatientName] = useState(testimonial?.patient_name || "");
  const [content, setContent] = useState(testimonial?.content || "");
  const [rating, setRating] = useState(testimonial?.rating ?? 5);
  const [order, setOrder] = useState(testimonial?.order || 0);

  return (
    <div className="space-y-4">
      <Input
        label="Nombre del paciente"
        id="patient_name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        required
      />
      <Textarea
        label="Testimonio"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Calificación
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-colors ${
                star <= rating ? "text-terracotta" : "text-sand hover:text-terracotta/50"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <Input
        label="Orden"
        id="order"
        type="number"
        min={0}
        value={order}
        onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
      />
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            onSave({ ...testimonial, patient_name: patientName, content, rating, order })
          }
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
