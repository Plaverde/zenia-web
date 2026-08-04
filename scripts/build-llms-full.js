const fs = require("fs");
const path = require("path");

// This script generates llms-full.txt by concatenating all page content
// Run after build: npm run postbuild

const pages = [
  {
    title: "Inicio",
    content: `Acompañamiento psicológico profesional para ansiedad y depresión, con terapias de tercera generación como mindfulness y ACT, en Montería y modalidad virtual. Un espacio seguro para cuidar tu bienestar emocional.`,
  },
  {
    title: "Sobre Mí",
    content: `Soy psicóloga clínica con especialización en terapias de tercera generación. Mi enfoque se centra en ayudarte a desarrollar habilidades reales para manejar la ansiedad, la depresión y las dificultades emocionales de la vida cotidiana. Creo que la terapia no se trata de eliminarse el dolor, sino de aprender a vivir con mayor flexibilidad, sentido y conexión con lo que realmente importa para ti. Mi consultorio se encuentra en el centro de Montería, Córdoba, un ambiente cálido y privado diseñado para que te sientas cómodo/a. También ofrezco sesiones virtuales para quienes no pueden asistir presencialmente, manteniendo la misma calidad y confidencialidad.`,
  },
  {
    title: "Servicios",
    content: `Terapia Individual para Adultos: Espacio seguro y confidencial para trabajar tu bienestar emocional a tu ritmo, con un enfoque humano y basado en evidencia. Atención Especializada en Ansiedad: Manejo de síntomas de ansiedad mediante terapias de tercera generación que te ayudan a recuperar el equilibrio emocional. Atención Especializada en Depresión: Acompañamiento profesional para superar episodios depresivos, reconstruir motivación y mejorar tu calidad de vida. Terapia Presencial en Montería: Sesiones en consultorio en el centro de la ciudad, en un ambiente cálido, privado y equipado para tu comodidad. Terapia Virtual (Videollamada): Atención profesional desde donde te encuentres, con la misma calidad y confidencialidad que una sesión presencial.`,
  },
  {
    title: "Especialidades",
    content: `Ansiedad: La ansiedad no es tu enemiga. Es una señal que tu cuerpo y mente envían cuando algo necesita atención. Aprender a escucharla sin dejarte dominar es el primer paso hacia el equilibrio. Depresión: Pedir ayuda cuando todo se siente pesado no es debilidad, es valentía. La depresión tiene tratamiento y no estás solo/a en este proceso. Mindfulness: Mindfulness no es 'no pensar'. Es una práctica de atención plena que te permite observar tus pensamientos y emociones sin reaccionar automáticamente ante ellos. Terapia ACT: ACT no te promete que el dolor desaparecerá. Te enseña a construir una vida con sentido aun cuando el dolor esté presente.`,
  },
  {
    title: "Blog: ¿Qué es la ansiedad?",
    content: `La ansiedad es una respuesta natural de tu cuerpo ante situaciones percibidas como amenazantes o inciertas. En pequeñas dosis, la ansiedad es útil: te mantiene alerta, te prepara para actuar y puede incluso salvarte de situaciones peligrosas. El problema surge cuando la ansiedad se vuelve desproporcionada, constante o aparece sin una razón aparente. Puede manifestarse en el cuerpo (tensión muscular, palpitaciones, sudoración), en los pensamientos (preocupación constante, anticipación de peores escenarios) y en el comportamiento (evitación de situaciones, inquietud). La ansiedad tiene tratamiento y responde muy bien al acompañamiento profesional.`,
  },
  {
    title: "Blog: Señales de depresión",
    content: `Muchas personas asocian la depresión con tristeza profunda y llanto constante, pero la realidad es que la depresión puede manifestarse de maneras mucho más sutiles. Las señales incluyen pérdida de interés o placer (anhedonia), cansancio inexplicable, dificultad para concentrarse, cambios en el sueño, cambios en el apetito, aislamiento social, y sentimientos de vacío o desesperanza. La depresión es una condición de salud, no una debilidad de carácter, y tiene tratamiento profesional efectivo.`,
  },
  {
    title: "Blog: Mindfulness",
    content: `El mindfulness no es "no pensar", no es solo relajación, no es una religión, y no es algo que solo hagan monjes. Mindfulness es la práctica de dirigir la atención al momento presente de manera intencional, sin juicio y con curiosidad. Sus tres pilares son: atención al momento presente, sin juicio, y con curiosidad. La investigación ha demostrado que la práctica regular produce cambios medibles en el cerebro: reduce la actividad de la amígdala, fortalece la corteza prefrontal, reduce los niveles de cortisol y mejora la atención sostenida.`,
  },
  {
    title: "Blog: Terapia ACT",
    content: `La Terapia de Aceptación y Compromiso (ACT) combina mindfulness con compromiso orientado a valores. Sus seis procesos fundamentales son: aceptación, defusión cognitiva, contacto con el momento presente, yo como contexto, valores y acción comprometida. La ACT es efectiva para ansiedad, depresión, dolor crónico, estrés y procrastinación. A diferencia de la terapia cognitivo-conductual tradicional, la ACT busca cambiar la relación que tienes con tus pensamientos, no el contenido de los pensamientos.`,
  },
];

let output = `# Zenia Álvarez Gulfo — Psicóloga Clínica en Montería\n\n`;
output += `> Acompañamiento psicológico profesional para ansiedad y depresión, con terapias de tercera generación como mindfulness y ACT, en Montería y modalidad virtual.\n\n`;
output += `---\n\n`;

for (const page of pages) {
  output += `## ${page.title}\n\n`;
  output += `${page.content}\n\n`;
  output += `---\n\n`;
}

output += `## Contacto\n\n`;
output += `- Dirección: Cra 19 #10-25 Centro, Montería, Córdoba, Colombia\n`;
output += `- WhatsApp: disponible para agendar citas\n`;
output += `- Formulario de contacto: disponible en el sitio web\n\n`;
output += `## Legal\n\n`;
output += `- Política de Tratamiento de Datos Personales conforme a la Ley 1581 de 2012\n`;
output += `- Aviso de Privacidad\n`;
output += `- Este sitio web es de carácter informativo y no reemplaza la atención profesional personalizada\n`;

const outputPath = path.join(__dirname, "..", "public", "llms-full.txt");
fs.writeFileSync(outputPath, output, "utf-8");

console.log(`Generated llms-full.txt (${output.length} bytes)`);
