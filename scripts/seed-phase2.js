const bcrypt = require('bcryptjs');
const { execSync } = require('child_process');

async function seed() {
  console.log('Generating password hash...');
  const passwordHash = await bcrypt.hash('Z3n!a_S3gur@2025#Px', 10);
  console.log('Hash generated:', passwordHash.substring(0, 20) + '...');

  // Create SQL with proper hash
  const sql = `
-- Phase 2 seed: Admin user and services

-- Admin user (password: Z3n!a_S3gur@2025#Px)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@zenia.com', '${passwordHash}', 'Administrador', 'admin')
ON DUPLICATE KEY UPDATE password_hash = '${passwordHash}';

-- Initial services
INSERT INTO services (slug, title, description, duration, price, active, \`order\`) VALUES
('terapia-individual', 'Terapia Individual', 'Sesiones personalizadas de psicoterapia adaptadas a tus necesidades específicas. Un espacio seguro y confidencial para trabajar en tu bienestar emocional.', '50 minutos', NULL, true, 1),
('atencion-ansiedad', 'Atención para Ansiedad', 'Tratamiento especializado para manejo de síntomas de ansiedad, incluyendo técnicas de tercera generación como mindfulness y ACT.', '50 minutos', NULL, true, 2),
('atencion-depresion', 'Atención para Depresión', 'Acompañamiento terapéutico para personas que experimentan síntomas depresivos, con enfoque humanístico y basado en evidencia.', '50 minutos', NULL, true, 3),
('terapia-presencial', 'Terapia Presencial', 'Sesiones en el consultorio ubicado en el centro de Montería, en un ambiente cálido y profesional.', '50 minutos', NULL, true, 4),
('terapia-virtual', 'Terapia Virtual', 'Sesiones por videollamada para personas que prefieren la comodidad de su hogar o se encuentran fuera de Montería.', '50 minutos', NULL, true, 5)
ON DUPLICATE KEY UPDATE title = VALUES(title);

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
    const match = bcrypt.compareSync('Z3n!a_S3gur@2025#Px', dbHash);
    console.log('Password verification:', match ? 'OK' : 'FAILED');
    fs.unlinkSync('prisma/verify.sql');
  } catch (error) {
    console.error('Error executing SQL:', error.message);
  }
}

seed();
