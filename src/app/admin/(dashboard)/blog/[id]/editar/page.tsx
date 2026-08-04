"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { toast } from "sonner";
import { BLOG_CATEGORIES } from "@/lib/constants";

export default function EditarArticuloPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [featuredImage, setFeaturedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    meta_title: "",
    meta_description: "",
    status: "draft",
  });

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          category: data.category || "",
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          status: data.status || "draft",
        });
        if (data.featured_image) {
          setFeaturedImage(data.featured_image);
          setImagePreview(data.featured_image);
        }
      })
      .catch(() => {
        toast.error("Error", { description: "No se pudo cargar el artículo." });
        router.push("/admin/blog");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagen muy grande", { description: "Máximo 5MB." });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImagePreview(null);
    setFeaturedImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function uploadImage(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = featuredImage;
      const file = fileInputRef.current?.files?.[0];

      if (file) {
        imageUrl = (await uploadImage(file)) || "";
      }

      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          featured_image: imageUrl || null,
        }),
      });

      if (!res.ok) throw new Error("Error");

      toast.success("Artículo actualizado", {
        description: "Los cambios se han guardado correctamente.",
      });
      router.push("/admin/blog");
    } catch {
      toast.error("Error", { description: "No se pudo guardar el artículo." });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-warm-gray">Cargando artículo...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal mb-8">Editar Artículo</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Título"
            id="title"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Título del artículo"
          />

          <Textarea
            label="Extracto"
            id="excerpt"
            name="excerpt"
            required
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Breve descripción del artículo"
          />

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Imagen Destacada
            </label>
            {imagePreview ? (
              <div className="relative w-full max-w-md">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={400}
                  height={200}
                  className="rounded-xl object-cover w-full h-48"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-charcoal/70 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-charcoal"
                >
                  ✕
                </button>
              </div>
            ) : (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="w-full px-4 py-3 rounded-xl border border-sand bg-white text-charcoal file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-sage/10 file:text-sage file:font-medium file:text-sm hover:file:bg-sage/20"
              />
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-charcoal mb-2">
              Contenido (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={15}
              value={form.content}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-sand bg-white text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage font-mono text-sm"
              placeholder="Escribe el contenido del artículo en Markdown..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Categoría"
              id="category"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
              options={BLOG_CATEGORIES}
            />

            <Select
              label="Estado"
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { value: "draft", label: "Borrador" },
                { value: "published", label: "Publicar" },
              ]}
            />
          </div>

          <Input
            label="Meta Título (SEO)"
            id="meta_title"
            name="meta_title"
            value={form.meta_title}
            onChange={handleChange}
            placeholder="Título optimizado para buscadores"
          />

          <Textarea
            label="Meta Descripción (SEO)"
            id="meta_description"
            name="meta_description"
            value={form.meta_description}
            onChange={handleChange}
            placeholder="Descripción para buscadores (máx. 160 caracteres)"
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/blog")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
