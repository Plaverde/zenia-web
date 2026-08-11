import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "zenia_db",
  connectionLimit: 10,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.faq_items.deleteMany();
  await prisma.blog_posts.deleteMany();

  // Seed FAQ items
  const faqs = [
    {
      question: "¿Cómo sé si necesito terapia psicológica?",
      answer:
        "Si sientes que tus emociones interfieren con tu vida diaria, relaciones, trabajo o bienestar general, la terapia puede ayudarte. No necesitas estar en una crisis para buscar acompañamiento profesional. Muchas personas inician terapia simplemente porque quieren conocerse mejor y mejorar su calidad de vida.",
      order: 1,
    },
    {
      question: "¿Cuánto dura cada sesión?",
      answer:
        "Las sesiones tienen una duración de 50 minutos. Este tiempo permite un espacio suficiente para trabajar de manera profunda sin sobrecargarte emocionalmente.",
      order: 2,
    },
    {
      question: "¿Atiendes de manera virtual?",
      answer:
        "Sí. Ofrezco terapia virtual por videollamada para personas que no pueden asistir al consultorio o que prefieren la comodidad de su hogar. La confidencialidad y la calidad de la atención se mantienen en ambas modalidades.",
      order: 3,
    },
    {
      question: "¿Cuál es el costo de la terapia?",
      answer:
        "Los valores se confirman al agendar la primera cita. El costo varía según la modalidad (presencial o virtual) y la duración del tratamiento. No dudes en escribirme para recibir información actualizada.",
      order: 4,
    },
    {
      question: "¿Qué debo traer a mi primera sesión?",
      answer:
        "No necesitas preparar nada especial. Solo necesitas llegar con la disposición de hablar y ser escuchado/a. Si lo deseas, puedes escribir previamente las razones que te llevaron a buscar terapia o las situaciones que te gustaría abordar.",
      order: 5,
    },
    {
      question: "¿La información que comparto es confidencial?",
      answer:
        "Sí. Todo lo que compartas en terapia es estrictamente confidencial, conforme a las normas éticas y legales de la psicología en Colombia. Tu información personal y clínica está protegida por la Ley 1581 de 2012 sobre protección de datos personales sensibles.",
      order: 6,
    },
    {
      question: "¿Puedo agendar una sesión de prueba?",
      answer:
        "La primera sesión funciona como una sesión de evaluación inicial. En ella podremos conocernos, entender tu situación y decidir juntos si el enfoque terapéutico es adecuado para ti. No hay compromiso de continuar si no te sientes cómodo/a.",
      order: 7,
    },
    {
      question: "¿Trabajas con niños o adolescentes?",
      answer:
        "Mi enfoque principal es la atención de adultos. Si necesitas apoyo para niños o adolescentes, puedo recomendarte colegas especializados en población infantojuvenil.",
      order: 8,
    },
  ];

  for (const faq of faqs) {
    await prisma.faq_items.create({ data: faq });
  }
  console.log(`Created ${faqs.length} FAQ items`);

  // Seed blog posts
  const posts = [
    {
      slug: "que-es-la-ansiedad",
      title: "¿Qué es la ansiedad y cómo puedes empezar a manejarla?",
      excerpt:
        "Entender la ansiedad es el primer paso para dejar de sentir que te controla. Te explicamos qué es, cómo se manifiesta y qué puedes hacer hoy mismo.",
      category: "Ansiedad",
      meta_title:
        "Qué es la ansiedad y cómo manejarla | Zenia Álvarez Gulfo",
      meta_description:
        "Guía completa para entender la ansiedad, sus síntomas y estrategias prácticas para empezar a manejarla con acompañamiento profesional.",
      published_at: new Date("2025-01-15"),
      status: "published",
      content: `# ¿Qué es la ansiedad y cómo puedes empezar a manejarla?

La ansiedad es una de las razones más comunes por las que las personas buscan terapia psicológica. Pero, ¿qué es exactamente la ansiedad y por qué a veces parece tomar el control de tu vida?

## ¿Qué es la ansiedad?

La ansiedad es una respuesta natural de tu cuerpo ante situaciones percibidas como amenazantes o inciertas. En pequeñas dosis, la ansiedad es útil: te mantiene alerta, te prepara para actuar y puede incluso salvarte de situaciones peligrosas.

El problema surge cuando la ansiedad se vuelve desproporcionada, constante o aparece sin una razón aparente. Cuando esto sucede, puede afectar tu calidad de vida, tus relaciones y tu salud física.

## Cómo se manifiesta la ansiedad

La ansiedad puede manifestarse de diferentes formas:

- **En el cuerpo:** tensión muscular, palpitaciones, sudoración, dificultad para respirar, insomnio, malestar estomacal.
- **En los pensamientos:** preocupación constante, anticipación de peores escenarios, dificultad para concentrarse, pensamientos catastróficos.
- **En el comportamiento:** evitación de situaciones, inquietud, dificultad para relajarse, irritabilidad.

## ¿Cuándo la ansiedad se convierte en un problema?

No toda ansiedad es un trastorno. La ansiedad se convierte en un problema cuando:

- Es desproporcionada a la situación real
- Persiste durante semanas o meses
- Interfiere con tu trabajo, relaciones o actividades diarias
- Te obliga a evitar situaciones importantes
- Provoca síntomas físicos intensos

## Qué puedes hacer ahora mismo

1. **Reconoce lo que sientes.** Nombrar la emoción es el primer paso para manejarla.
2. **Practica respiración consciente.** Respirar lento y profundo activa tu sistema de calma.
3. **Muévete.** El ejercicio físico libera tensión y mejora tu estado de ánimo.
4. **Habla con alguien de confianza.** Compartir lo que sientes alivia la carga emocional.
5. **Busca ayuda profesional.** Un psicólogo puede ayudarte a entender y manejar tu ansiedad de manera efectiva.

## La ansiedad tiene tratamiento

La buena noticia es que la ansiedad responde muy bien al tratamiento psicológico. Terapias como el mindfulness y la Terapia de Aceptación y Compromiso (ACT) han demostrado ser especialmente efectivas para el manejo de la ansiedad.

No se trata de eliminar la ansiedad por completo (eso no es posible ni deseable), sino de cambiar tu relación con ella para que no dirija tu vida.

---

*Si sientes que la ansiedad está afectando tu calidad de vida, puedes agendar una primera sesión para conversar sobre tu situación y explorar cómo puedo acompañarte.*`,
    },
    {
      slug: "senales-depresion",
      title:
        "Señales de que podrías estar atravesando un episodio depresivo",
      excerpt:
        "La depresión no siempre se ve como tristeza evidente. A veces se manifiesta como cansancio, desinterés o dificultad para concentrarse. Aprende a identificar las señales.",
      category: "Depresión",
      meta_title:
        "Señales de episodio depresivo | Zenia Álvarez Gulfo",
      meta_description:
        "Identifica las señales de un episodio depresivo y descubre por qué buscar ayuda profesional es un acto de valentía, no de debilidad.",
      published_at: new Date("2025-02-10"),
      status: "published",
      content: `# Señales de que podrías estar atravesando un episodio depresivo

Muchas personas asocian la depresión con tristeza profunda y llanto constante, pero la realidad es que la depresión puede manifestarse de maneras mucho más sutiles. A veces, la persona ni siquiera se da cuenta de que está pasando por un episodio depresivo.

## ¿Qué es un episodio depresivo?

Un episodio depresivo es un período prolongado de ánimo deprimido o pérdida de interés en actividades que antes resultaban placenteras. Para considerarse un episodio depresivo, los síntomas deben estar presentes la mayor parte del día, casi todos los días, durante al menos dos semanas.

## Señales que no siempre reconocemos

### Pérdida de interés o placer
Una de las señales más claras es la anhedonia: la incapacidad de disfrutar cosas que antes te gustaban. Puede ser música, comida, tiempo con amigos o incluso actividades íntimas.

### Cansancio inexplicable
Si duermes lo suficiente pero te sientes agotado/a todo el tiempo, esto puede ser una señal de depresión. El cuerpo y la mente están usando mucha energía para mantener el equilibrio emocional.

### Dificultad para concentrarse
La depresión afecta las funciones cognitivas. Puedes notar que se te olvidan cosas con más frecuencia, que te cuesta tomar decisiones simples o que leer un texto te toma más esfuerzo del normal.

### Cambios en el sueño
Tanto el insomnio como la hipersomnia (dormir demasiado) pueden ser señales de depresión. Si tu patrón de sueño ha cambiado significativamente sin una razón aparente, presta atención.

### Cambios en el apetito
Algunas personas comen mucho menos de lo normal, otras comen más. Ambos cambios pueden ser señales de un episodio depresivo.

### Aislamiento social
La tendencia a alejarse de amigos, familiares y actividades sociales es una señal importante. La depresión hace que el contacto social se sienta como una carga insoportable.

### Sentimientos de vacío o desesperanza
La sensación de que nada tiene sentido, de que las cosas nunca van a mejorar o de que no hay salida es una de las señales más preocupantes de la depresión.

## ¿Por qué es importante buscar ayuda?

La depresión es una condición de salud, no una debilidad de carácter. No se supera con voluntad alone, igual que no se supera una fractura sin atención médica.

El tratamiento psicológico profesional proporciona:

- Un espacio seguro para ser escuchado/a sin juicio
- Herramientas concretas para manejar los síntomas
- Comprensión de los patrones de pensamiento que mantienen la depresión
- Un camino claro hacia la recuperación

## No estás solo/a

Si reconoces varias de estas señales en ti mismo/a o en alguien cercano, el primer paso es hablar con un profesional. Pedir ayuda no es un signo de debilidad; es un acto de valentía y cuidado propio.

---

*Si quieres conversar sobre lo que estás sintiendo, puedes agendar una primera sesión sin compromiso. Estoy aquí para acompañarte.*`,
    },
    {
      slug: "mindfulness-que-no-es-que-puede-ser",
      title:
        "Mindfulness: qué no es y qué puede ser para ti",
      excerpt:
        "Mindfulness no es 'no pensar' ni una moda pasajera. Es una práctica respaldada por la ciencia que puede cambiar tu relación con tus emociones y pensamientos.",
      category: "Mindfulness",
      meta_title:
        "Qué es Mindfulness y cómo funciona | Zenia Álvarez Gulfo",
      meta_description:
        "Descubre qué es realmente el mindfulness, qué no es, y cómo esta práctica puede ayudarte a manejar el estrés, la ansiedad y mejorar tu bienestar emocional.",
      published_at: new Date("2025-03-05"),
      status: "published",
      content: `# Mindfulness: qué no es y qué puede ser para ti

El mindfulness está de moda, y eso tiene cosas buenas y malas. Lo bueno es que cada vez más personas conocen esta práctica. Lo malo es que rodeada de mitos y malentendidos, muchas personas se alejan de algo que realmente puede ayudarles.

## ¿Qué no es el mindfulness?

### No es "no pensar"
El error más común. Mindfulness no consiste en vaciar tu mente de pensamientos. Los pensamientos van a seguir apareciendo siempre. La práctica consiste en observar esos pensamientos sin engancharte con ellos, sin juzgarlos y sin reaccionar automáticamente.

### No es relajación
Aunque la relajación puede ser un efecto secundario, el mindfulness no tiene como objetivo principal relajarte. Su objetivo es desarrollar la atención plena: la capacidad de estar presente en el momento actual con curiosidad y apertura.

### No es una religión
Aunque el mindfulness tiene raíces en la tradición budista, la práctica secular que se usa en psicología y medicina no tiene ninguna religión asociada. Es una herramienta basada en evidencia científica.

### No es algo que solo hacen monjes
El mindfulness es para cualquier persona. No necesitas sentarte en posición de loto ni meditar horas. La práctica puede integrarse en actividades cotidianas como caminar, comer o incluso lavar los platos.

## ¿Qué es el mindfulness?

Mindfulness es la práctica de dirigir la atención al momento presente de manera intencional, sin juicio y con curiosidad. Es observar lo que está pasando ahora mismo en tu cuerpo, mente y entorno, sin tratar de cambiar nada.

### Los tres pilares del mindfulness:

1. **Atención al momento presente.** En lugar de estar en tu mente reviviendo el pasado o anticipando el futuro, traes tu atención al aquí y ahora.
2. **Sin juicio.** No hay pensamientos "buenos" ni "malos", emociones "correctas" o "incorrectas". Todo se observa tal como es.
3. **Con curiosidad.** En lugar de reaccionar automáticamente, te acercas a tu experiencia con una actitud de interés y apertura.

## ¿Cómo funciona científicamente?

La investigación ha demostrado que la práctica regular de mindfulness produce cambios medibles en el cerebro:

- Reduce la actividad de la amígdala (el centro del miedo y la reactividad emocional)
- Fortalece la corteza prefrontal (la parte del cerebro encargada de la toma de decisiones y el autocontrol)
- Reduce los niveles de cortisol (la hormona del estrés)
- Mejora la atención sostenida y la memoria de trabajo

## ¿Cómo empezar a practicar?

1. **Respiración consciente (3 minutos).** Siéntate cómodo/a, cierra los ojos y presta atención a tu respiración. Cuando tu mente divague (lo hará), simplemente nota a dónde fue y vuelve suavemente a la respiración.
2. **Escaneo corporal (5 minutos).** Recorre tu cuerpo desde los pies hasta la cabeza, notando las sensaciones en cada parte sin juzgar.
3. **Atención plena en actividades cotidianas.** Elige una actividad diaria (comprar el café, caminar, comer) y dedícale toda tu atención durante unos minutos.

## Mindfulness en terapia

En mi práctica como psicóloga, integro el mindfulness como herramienta terapéutica dentro de un enfoque más amplio llamado Terapia de Aceptación y Compromiso (ACT). Juntos, forman un sistema poderoso para:

- Manejar la ansiedad sin evitar situaciones
- Salir de patrones depresivos de pensamiento
- Desarrollar mayor flexibilidad emocional
- Vivir de acuerdo con tus valores

---

*Si te interesa conocer más sobre cómo el mindfulness puede ayudarte en tu situación particular, puedes agendar una primera sesión para explorarlo juntos.*`,
    },
    {
      slug: "terapia-act-aceptar-para-no-quedarse-estancado",
      title: "Terapia ACT: aceptar para no quedarse estancado",
      excerpt:
        "La Terapia de Aceptación y Compromiso no te promete que el dolor desaparezca. Te enseña a construir una vida con sentido, aun cuando el dolor esté presente.",
      category: "Terapia ACT",
      meta_title:
        "Terapia ACT: Aceptación y Compromiso | Zenia Álvarez Gulfo",
      meta_description:
        "Conoce la Terapia ACT (Aceptación y Compromiso), una terapia de tercera generación que te ayuda a vivir según tus valores, aceptando el dolor como parte de la vida.",
      published_at: new Date("2025-04-01"),
      status: "published",
      content: `# Terapia ACT: aceptar para no quedarse estancado

La Terapia de Aceptación y Compromiso (ACT, por sus siglas en inglés) es una de las terapias de tercera generación con más respaldo científico en la actualidad. Pero, ¿en qué se diferencia de otras terapias y cómo puede ayudarte?

## ¿Qué es la ACT?

ACT es una forma de terapia psicológica que combina mindfulness con compromiso orientado a valores. Su objetivo no es eliminar el sufrimiento, sino desarrollar la flexibilidad psicológica: la capacidad de estar presente, aceptar lo que no puedes controlar y actuar en consonancia con lo que realmente importa.

## Los six procesos fundamentales de la ACT

### 1. Aceptación
No se trata de resignarse o conformarse. Aceptación significa estar dispuesto a experimentar pensamientos y emociones difíciles sin intentar controlarlos o eliminarlos. Es dejar de luchar contra lo que ya está ahí.

### 2. Defusión cognitiva
Es la capacidad de observar tus pensamientos como lo que son: palabras e imágenes que pasan por tu mente, no verdades absolutas. En lugar de "soy un fracasado", puedes notar "estoy teniendo el pensamiento de que soy un fracasado".

### 3. Contacto con el momento presente
Aquí es donde entra el mindfulness. Estar plenamente aquí y ahora, en lugar de estar atrapado en el pasado o anticipando el futuro.

### 4. Yo como contexto
Es reconocer que no eres tus pensamientos, emociones ni experiencias. Eres el espacio en el que todo eso ocurre. Este cambio de perspectiva es liberador.

### 5. Valores
¿Qué es lo que realmente importa en tu vida? ¿Qué tipo de persona quieres ser? ¿Hacia dónde quieres dirigir tu energía? Los valores son la brújula que guía tus acciones.

### 6. Acción comprometida
Una vez que tienes claros tus valores, el siguiente paso es actuar en consecuencia, incluso cuando haya miedo, incomodidad o dolor en el camino.

## ¿Para qué problemas es efectiva la ACT?

La ACT ha demostrado ser efectiva para:

- **Ansiedad:** reduce la evitación y la lucha contra los pensamientos ansiosos
- **Depresión:** ayuda a salir de los ciclos de pensamientos negativos recurrentes
- **Dolor crónico:** mejora la calidad de vida a pesar del dolor persistente
- **Estrés:** desarrolla mayor flexibilidad para enfrentar situaciones estresantes
- **Procrastinación:** conecta con valores que motivan la acción

## ¿En qué se diferencia de otras terapias?

A diferencia de la terapia cognitivo-conductual tradicional, que busca cambiar el contenido de los pensamientos, la ACT busca cambiar la relación que tienes con tus pensamientos. No se trata de que pienses de manera diferente, sino de que tengas más flexibilidad para elegir cómo responder a lo que piensas y sientes.

## Un ejemplo práctico

Imagina que tienes miedo de hablar en público. La terapia tradicional podría ayudarte a cuestionar esos pensamientos de miedo. La ACT te enseñaría a:

1. **Notar** el miedo sin intentar eliminarlo
2. **Reconocer** que el miedo es una emoción, no una verdad sobre tu capacidad
3. **Identificar** qué es lo que realmente te importa (compartir tu conocimiento, ayudar a otros)
4. **Actuar** de acuerdo con ese valor, incluso con el miedo presente

---

*Si quieres explorar cómo la ACT puede ayudarte en tu situación particular, puedo acompañarte en ese proceso. Agenda una primera sesión para conocernos.*`,
    },
  ];

  for (const post of posts) {
    await prisma.blog_posts.create({ data: post });
  }
  console.log(`Created ${posts.length} blog posts`);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
