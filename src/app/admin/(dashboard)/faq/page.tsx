"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/faq");
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setFaqs(data);
    } catch {
      toast.error("Error", { description: "No se pudieron cargar las FAQ." });
    } finally {
      setIsLoading(false);
    }
  }

  async function saveFaq(faq: Partial<FAQ>) {
    try {
      const method = faq.id ? "PATCH" : "POST";
      const url = faq.id ? `/api/admin/faq/${faq.id}` : "/api/admin/faq";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faq),
      });

      if (!res.ok) throw new Error("Error");

      toast.success("Guardado", { description: "FAQ actualizada correctamente." });
      setShowNew(false);
      setEditingId(null);
      fetchFaqs();
    } catch {
      toast.error("Error", { description: "No se pudo guardar la FAQ." });
    }
  }

  async function deleteFaq(id: number) {
    if (!confirm("¿Eliminar esta FAQ?")) return;
    try {
      await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
      toast.success("Eliminada", { description: "FAQ eliminada correctamente." });
      fetchFaqs();
    } catch {
      toast.error("Error", { description: "No se pudo eliminar la FAQ." });
    }
  }

  async function toggleActive(faq: FAQ) {
    await saveFaq({ ...faq, active: !faq.active });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-charcoal">Gestión de FAQ</h1>
        <Button variant="primary" onClick={() => setShowNew(true)}>
          Nueva FAQ
        </Button>
      </div>

      {showNew && (
        <Card className="p-6 mb-6">
          <h3 className="font-medium text-charcoal mb-4">Nueva Pregunta</h3>
          <FAQForm
            onSave={saveFaq}
            onCancel={() => setShowNew(false)}
          />
        </Card>
      )}

      {isLoading ? (
        <p className="text-warm-gray text-center py-8">Cargando FAQ...</p>
      ) : faqs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-warm-gray">No hay preguntas frecuentes creadas.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="p-6">
              {editingId === faq.id ? (
                <FAQForm
                  faq={faq}
                  onSave={saveFaq}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-charcoal">{faq.question}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          faq.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {faq.active ? "Activa" : "Inactiva"}
                      </span>
                    </div>
                    <p className="text-sm text-warm-gray line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleActive(faq)}
                      variant="ghost"
                      size="sm"
                    >
                      {faq.active ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      onClick={() => setEditingId(faq.id)}
                      variant="outline"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => deleteFaq(faq.id)}
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

function FAQForm({
  faq,
  onSave,
  onCancel,
}: {
  faq?: FAQ;
  onSave: (faq: Partial<FAQ>) => void;
  onCancel: () => void;
}) {
  const [question, setQuestion] = useState(faq?.question || "");
  const [answer, setAnswer] = useState(faq?.answer || "");
  const [order, setOrder] = useState(faq?.order || 0);

  return (
    <div className="space-y-4">
      <Input
        label="Pregunta"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <Textarea
        label="Respuesta"
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
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
          onClick={() => onSave({ ...faq, question, answer, order })}
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
