import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { SITE, SERVICES, SPECIALTIES, FAQS } from "../src/lib/constants";

// Generates public/llms-full.txt from live site content (DB + constants).
// Runs after build: npm run postbuild

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "zenia_db",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const baseUrl = "https://zenia-web.vercel.app";

async function main() {
  let output = `# ${SITE.name} — ${SITE.profession} en Montería\n\n`;
  output += `> Acompañamiento psicológico profesional para ansiedad y depresión, con terapias de tercera generación como mindfulness y ACT, en Montería y modalidad virtual.\n\n`;
  output += `---\n\n`;

  output += `## Servicios\n\n`;
  for (const service of SERVICES) {
    output += `### ${service.title}\n\n${service.description}\n\n`;
  }
  output += `---\n\n`;

  output += `## Especialidades\n\n`;
  for (const specialty of SPECIALTIES) {
    output += `### ${specialty.title}\n\n${specialty.summary}\n\n${baseUrl}/especialidades/${specialty.slug}\n\n`;
  }
  output += `---\n\n`;

  output += `## Blog\n\n`;
  try {
    const posts = await prisma.blog_posts.findMany({
      where: { status: "published" },
      orderBy: { published_at: "desc" },
      select: { title: true, slug: true, excerpt: true },
    });
    for (const post of posts) {
      output += `### ${post.title}\n\n${baseUrl}/blog/${post.slug}\n\n${post.excerpt}\n\n`;
    }
  } catch {
    console.warn(
      "build-llms-full: no se pudo conectar a la base de datos, se omite la seccion de blog"
    );
  }
  output += `---\n\n`;

  output += `## Preguntas frecuentes\n\n`;
  for (const faq of FAQS) {
    output += `**${faq.question}**\n\n${faq.answer}\n\n`;
  }
  output += `---\n\n`;

  output += `## Contacto\n\n`;
  output += `- Dirección: ${SITE.address}, Córdoba, Colombia\n`;
  output += `- Formulario de contacto: ${baseUrl}/contacto\n`;
  output += `- Tarifas y reserva de cita: ${baseUrl}/tarifas\n\n`;

  output += `## Legal\n\n`;
  output += `- Política de Tratamiento de Datos Personales conforme a la Ley 1581 de 2012\n`;
  output += `- Aviso de Privacidad\n`;
  output += `- Este sitio web es de carácter informativo y no reemplaza la atención profesional personalizada\n`;

  const outputPath = path.join(__dirname, "..", "public", "llms-full.txt");
  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`Generated llms-full.txt (${output.length} bytes)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
