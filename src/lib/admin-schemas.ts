import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio"),
  excerpt: z.string().trim().min(1, "El extracto es obligatorio"),
  content: z.string().trim().min(1, "El contenido es obligatorio"),
  category: z.string().trim().min(1, "La categoría es obligatoria"),
  meta_title: z.string().trim().optional().nullable(),
  meta_description: z.string().trim().optional().nullable(),
  featured_image: z.string().trim().optional().nullable(),
  status: z.enum(["draft", "published"]).optional().default("draft"),
});

export const faqItemSchema = z.object({
  question: z.string().trim().min(1, "La pregunta es obligatoria"),
  answer: z.string().trim().min(1, "La respuesta es obligatoria"),
  order: z.number().int().optional().default(0),
  active: z.boolean().optional().default(true),
});
export const faqItemUpdateSchema = faqItemSchema.partial();

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio"),
  description: z.string().trim().min(1, "La descripción es obligatoria"),
  duration: z.string().trim().optional().nullable(),
  price: z.string().trim().optional().nullable(),
  order: z.number().int().optional().default(0),
});
export const serviceUpdateSchema = serviceSchema.partial().extend({
  active: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  patient_name: z.string().trim().min(1, "El nombre del paciente es obligatorio"),
  content: z.string().trim().min(1, "El contenido es obligatorio"),
  rating: z.number().int().min(1).max(5).optional().default(5),
  active: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});
export const testimonialUpdateSchema = testimonialSchema.partial();

export const messageUpdateSchema = z.object({
  read: z.boolean(),
});

export const patientUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "active", "archived"]).optional(),
  notes: z.string().trim().optional().nullable(),
});

export const appointmentUpdateSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
  admin_notes: z.string().trim().optional().nullable(),
});
