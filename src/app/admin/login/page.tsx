"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales incorrectas. Intenta de nuevo.");
        toast.error("Error de autenticación", {
          description: "Credenciales incorrectas. Por favor, verifica tu email y contraseña.",
        });
      } else {
        toast.success("Bienvenido", {
          description: "Inicio de sesión exitoso.",
        });
        router.push("/admin");
      }
    } catch {
      setError("Error al iniciar sesión. Intenta de nuevo.");
      toast.error("Error", {
        description: "Hubo un problema al conectar con el servidor.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-charcoal mb-2">
            Panel de Administración
          </h1>
          <p className="text-warm-gray">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-sand">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              id="email"
              type="email"
              name="email"
              placeholder="admin@zenia.com"
              required
            />

            <Input
              label="Contraseña"
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </div>

        <p className="text-center text-warm-gray-light text-sm mt-6">
          <a href="/" className="hover:text-sage transition-colors">
            ← Volver al sitio web
          </a>
        </p>
      </div>
    </div>
  );
}
