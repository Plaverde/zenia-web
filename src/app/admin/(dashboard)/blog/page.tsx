"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  status: string;
  published_at: string | null;
  created_at: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setPosts(data);
    } catch {
      toast.error("Error", { description: "No se pudieron cargar los artículos." });
    } finally {
      setIsLoading(false);
    }
  }

  async function deletePost(id: number) {
    if (!confirm("¿Eliminar este artículo?")) return;
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      toast.success("Eliminado", { description: "Artículo eliminado correctamente." });
      fetchPosts();
    } catch {
      toast.error("Error", { description: "No se pudo eliminar el artículo." });
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-charcoal">Recursos</h1>
        <Link href="/admin/blog/nuevo">
          <Button variant="primary">Nuevo artículo</Button>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-warm-gray text-center py-8">Cargando artículos...</p>
      ) : posts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-warm-gray mb-4">No hay artículos creados.</p>
          <Link href="/admin/blog/nuevo">
            <Button variant="primary">Crear primer artículo</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-charcoal">{post.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status === "published" ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                  <div className="text-sm text-warm-gray">
                    <p>Categoría: {post.category}</p>
                    <p>
                      {post.published_at
                        ? `Publicado: ${new Date(post.published_at).toLocaleDateString("es-CO")}`
                        : `Creado: ${new Date(post.created_at).toLocaleDateString("es-CO")}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/${post.id}/editar`}>
                    <Button variant="outline" size="sm">Editar</Button>
                  </Link>
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button variant="ghost" size="sm">Ver</Button>
                  </Link>
                  <Button
                    onClick={() => deletePost(post.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
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
