"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export default function MensajesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setMessages(data);
    } catch {
      toast.error("Error", { description: "No se pudieron cargar los mensajes." });
    } finally {
      setIsLoading(false);
    }
  }

  async function markAsRead(id: number) {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      fetchMessages();
    } catch {
      toast.error("Error", { description: "No se pudo marcar como leído." });
    }
  }

  async function markAsUnread(id: number) {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: false }),
      });
      fetchMessages();
    } catch {
      toast.error("Error", { description: "No se pudo marcar como no leído." });
    }
  }

  async function deleteMessage(id: number) {
    if (!confirm("¿Eliminar este mensaje?")) return;
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      toast.success("Eliminado", { description: "Mensaje eliminado correctamente." });
      fetchMessages();
    } catch {
      toast.error("Error", { description: "No se pudo eliminar el mensaje." });
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-charcoal">
          Mensajes de Contacto
          {unreadCount > 0 && (
            <span className="ml-3 text-sm font-normal text-terracotta">
              ({unreadCount} sin leer)
            </span>
          )}
        </h1>
      </div>

      {isLoading ? (
        <p className="text-warm-gray text-center py-8">Cargando mensajes...</p>
      ) : messages.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-warm-gray">No hay mensajes de contacto.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card key={msg.id} className={`p-6 ${!msg.read ? "border-l-4 border-sage" : ""}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-charcoal">{msg.name}</h3>
                    {!msg.read && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-sage/10 text-sage">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-warm-gray space-y-1">
                    <p>📧 {msg.email} | 📱 {msg.phone || "Sin teléfono"}</p>
                    <p className="text-warm-gray-light">
                      {new Date(msg.created_at).toLocaleString("es-CO")}
                    </p>
                    <p className="mt-3 text-charcoal whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {msg.read ? (
                    <Button
                      onClick={() => markAsUnread(msg.id)}
                      variant="ghost"
                      size="sm"
                    >
                      Marcar no leído
                    </Button>
                  ) : (
                    <Button
                      onClick={() => markAsRead(msg.id)}
                      variant="primary"
                      size="sm"
                    >
                      Marcar leído
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteMessage(msg.id)}
                    variant="outline"
                    size="sm"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
