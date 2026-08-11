const bcrypt = require('bcryptjs');
const { execSync } = require('child_process');
require('dotenv').config();

async function seed() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('Error: ADMIN_PASSWORD env var is missing. Set it in .env before running this script.');
    process.exit(1);
  }

  console.log('Generating password hash...');
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  console.log('Hash generated:', passwordHash.substring(0, 20) + '...');

  // Create SQL with proper hash
  const sql = `
-- Phase 2 seed: Admin user and services

-- Admin user (password from ADMIN_PASSWORD env var)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@zenia.com', '${passwordHash}', 'Administrador', 'admin')
ON DUPLICATE KEY UPDATE password_hash = '${passwordHash}';

-- Initial services
INSERT INTO services (slug, title, description, duration, price, active, \`order\`) VALUES
('terapia-individual', 'Terapia Individual para Adultos', 'Un espacio seguro y confidencial para trabajar tu bienestar emocional a tu propio ritmo, con un enfoque humano, cercano y basado en evidencia.', '50 minutos', NULL, true, 1),
('atencion-ansiedad', 'Atención Especializada en Ansiedad', 'Acompañamiento para entender y manejar la ansiedad desde terapias de tercera generación, como ACT y mindfulness, para que recuperes tu equilibrio poco a poco.', '50 minutos', NULL, true, 2),
('atencion-depresion', 'Atención Especializada en Depresión', 'Espacio de contención para atravesar episodios depresivos, reconstruir la motivación y encontrar de nuevo espacios de bienestar.', '50 minutos', NULL, true, 3),
('terapia-presencial', 'Terapia Presencial en Montería', 'Sesiones en consultorio ubicado en el centro de Montería, en un ambiente cálido, privado y pensado para tu comodidad.', '50 minutos', NULL, true, 4),
('terapia-virtual', 'Terapia Virtual (Videollamada)', 'Atención profesional desde donde te encuentres, con la misma calidad, confidencialidad y cuidado que una sesión presencial.', '50 minutos', NULL, true, 5)
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);

-- Sample patient leads
INSERT INTO patients_leads (full_name, phone, email, consultation_reason, preferred_modality, source, status) VALUES
('María García', '3001234567', 'maria@email.com', 'Problemas de ansiedad', 'presencial', 'website', 'new'),
('Carlos López', '3109876543', 'carlos@email.com', 'Depresión leve', 'virtual', 'website', 'contacted')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);
`;

  // Write SQL to file
  const fs = require('fs');
  fs.writeFileSync('prisma/seed-phase2-final.sql', sql);
  console.log('SQL file written to prisma/seed-phase2-final.sql');

  // Execute via MySQL
  console.log('Executing SQL...');
  try {
    execSync(`cmd /c "type prisma\\seed-phase2-final.sql | C:\\xampp\\mysql\\bin\\mysql.exe -u root zenia_db"`, {
      stdio: 'inherit'
    });
    console.log('Seed completed successfully!');

    // Verify password
    const verifySql = `SELECT password_hash FROM admin_users WHERE email='admin@zenia.com';`;
    fs.writeFileSync('prisma/verify.sql', verifySql, 'utf8');
    const dbHash = execSync('cmd /c "C:\\xampp\\mysql\\bin\\mysql.exe -u root zenia_db -N < prisma\\verify.sql"').toString().trim();
    const match = bcrypt.compareSync(adminPassword, dbHash);
    console.log('Password verification:', match ? 'OK' : 'FAILED');
    fs.unlinkSync('prisma/verify.sql');
  } catch (error) {
    console.error('Error executing SQL:', error.message);
  }
}

seed();
