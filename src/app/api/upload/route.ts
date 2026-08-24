import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Extension is derived from these detected magic bytes, never from the
// client-supplied filename or Content-Type header (both are spoofable).
const MAGIC_BYTES: { ext: string; check: (buf: Buffer) => boolean }[] = [
  { ext: "jpg", check: (buf) => buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff },
  {
    ext: "png",
    check: (buf) =>
      buf[0] === 0x89 &&
      buf[1] === 0x50 &&
      buf[2] === 0x4e &&
      buf[3] === 0x47 &&
      buf[4] === 0x0d &&
      buf[5] === 0x0a &&
      buf[6] === 0x1a &&
      buf[7] === 0x0a,
  },
  { ext: "gif", check: (buf) => buf.toString("ascii", 0, 6) === "GIF87a" || buf.toString("ascii", 0, 6) === "GIF89a" },
  {
    ext: "webp",
    check: (buf) => buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP",
  },
];

function detectExtension(buf: Buffer): string | null {
  return MAGIC_BYTES.find(({ check }) => check(buf))?.ext ?? null;
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Max size: 5MB" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = detectExtension(buffer);
  if (!ext) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
      { status: 400 }
    );
  }

  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filepath = join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
}
