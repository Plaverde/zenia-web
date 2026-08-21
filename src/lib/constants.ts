export const SITE = {
  name: "Zenia Álvarez Gulfo",
  profession: "Psicóloga clínica",
  city: "Montería, Córdoba, Colombia",
  address: "Cra 19 #10-25 Centro, Montería",
  phone: "[NUMERO_DE_WHATSAPP]",
  email: "[EMAIL_DE_CONTACTO]",
  whatsappMessage: "Hola, me gustaría agendar una cita de terapia.",
  registrationNumber: "[NUMERO_COLEGIADO]",
  repsNumber: "[REGISTRO_REPS]",
  licenseInfo: "Habilitada conforme a la Resolución 3100 de 2019",
} as const;

export const BLOG_CATEGORIES = [
  { value: "ansiedad", label: "Ansiedad" },
  { value: "depresion", label: "Depresión" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "act", label: "ACT" },
  { value: "regulacion-emocional", label: "Regulación emocional" },
  { value: "autocuidado", label: "Autocuidado" },
  { value: "salud-mental", label: "Salud mental" },
];

export const SERVICES = [
  {
    id: "terapia-individual",
    title: "Terapia individual para adultos",
    description:
      "Un espacio seguro y confidencial para trabajar tu bienestar emocional a tu propio ritmo, con un enfoque humano, cercano y basado en evidencia.",
  },
  {
    id: "ansiedad",
    title: "Atención especializada en ansiedad",
    description:
      "Acompañamiento para entender y manejar la ansiedad desde terapias de tercera generación, como ACT y mindfulness, para que recuperes tu equilibrio poco a poco.",
  },
  {
    id: "depresion",
    title: "Atención especializada en depresión",
    description:
      "Espacio de contención para atravesar episodios depresivos, reconstruir la motivación y encontrar de nuevo espacios de bienestar.",
  },
  {
    id: "terapia-presencial",
    title: "Terapia presencial en Montería",
    description:
      "Sesiones en consultorio ubicado en el centro de Montería, en un ambiente cálido, privado y pensado para tu comodidad.",
  },
  {
    id: "terapia-virtual",
    title: "Terapia virtual (videollamada)",
    description:
      "Atención profesional desde donde te encuentres, con la misma calidad, confidencialidad y cuidado que una sesión presencial.",
  },
] as const;

export const SPECIALTIES = [
  {
    slug: "ansiedad",
    title: "Ansiedad",
    category: "emocional",
    summary:
      "La ansiedad no es tu enemiga. Es una señal que tu cuerpo y mente envían cuando algo necesita atención. Aprender a escucharla sin dejarte dominar es el primer paso hacia el equilibrio.",
    description:
      "La ansiedad puede manifestarse como preocupación constante, tensión muscular, dificultad para concentrarse, insomnio o ataques de pánico. No es un defecto de carácter ni algo que debas simplemente 'aguantar'. Con el acompañamiento adecuado, puedes aprender a reconocer tus patrones de ansiedad y desarrollar herramientas reales para manejarla. El enfoque de tercera generación no busca eliminar la ansiedad, sino cambiar tu relación con ella para que no dirija tu vida.",
    biopsychosocial: "La ansiedad involucra factores biológicos (genética, neuroquímica), psicológicos (pensamientos, emociones, aprendizajes) y sociales (entorno familiar, laboral, cultural). Un enfoque integral considera todas estas dimensiones.",
    techniques: ["ACT", "Mindfulness", "Terapia Cognitivo-Conductual", "Relajación", "Respiración consciente"],
    showEmergencyBanner: true,
  },
  {
    slug: "depresion",
    title: "Depresión",
    category: "emocional",
    summary:
      "Pedir ayuda cuando todo se siente pesado no es debilidad, es valentía. La depresión tiene tratamiento y no estás solo/a en este proceso.",
    description:
      "La depresión va más allá de la tristeza. Puede incluir pérdida de interés, fatiga, dificultad para tomar decisiones, cambios en el sueño y el apetito, y un sentido de vacío que parece no tener fin. El tratamiento psicológico profesional te brinda un espacio para ser escuchado/a sin juicio, entender lo que está pasando y construir caminos concretos hacia tu recuperación. No se trata de 'pensar positivo', sino de entender y actuar con acompañamiento.",
    biopsychosocial: "La depresión no es solo 'tristeza'. Influyen factores biológicos (neurotransmisores, genética), psicológicos (patrones de pensamiento, historia personal) y sociales (relaciones, entorno, contexto vital). Mi enfoque aborda todas estas dimensiones.",
    techniques: ["Terapia Cognitivo-Conductual", "ACT", "Activación conductual", "Mindfulness"],
    showEmergencyBanner: true,
  },
  {
    slug: "estres",
    title: "Estrés",
    category: "emocional",
    summary:
      "El estrés crónico no es normal. Si sientes que siempre estás en modo supervivencia, es momento de recuperar el control de tu vida.",
    description:
      "El estrés prolongado agota tus recursos físicos, emocionales y mentales. Puede manifestarse como irritabilidad, dolores de cabeza, tensión muscular, problemas digestivos, dificultad para dormir y una sensación constante de estar sobrecargado/a. El estrés no tratado puede derivar en ansiedad, depresión o problemas de salud física. Aprender a gestionar el estrés no es un lujo, es una necesidad para tu bienestar integral.",
    biopsychosocial: "El estrés involucra la activación del sistema de respuesta al estrés (biológico), patrones de pensamiento y conductas de afrontamiento (psicológico), y factores como la carga laboral, las relaciones y el contexto socioeconómico (social).",
    techniques: ["Mindfulness", "Técnicas de relajación", "Gestión del tiempo", "ACT", "Psicoeducación"],
    showEmergencyBanner: false,
  },
  {
    slug: "duelo",
    title: "Duelo",
    category: "emocional",
    summary:
      "El duelo no tiene un camino lineal. Cada persona necesita su propio proceso y tiempo para adaptarse a la pérdida.",
    description:
      "El duelo es la respuesta natural ante una pérdida, ya sea la muerte de un ser querido, el fin de una relación, la pérdida de un empleo o cualquier cambio significativo. No existe una forma 'correcta' de hacer duelo. El acompañamiento terapéutico te brinda un espacio seguro para procesar el dolor, encontrar significado y reconstruir tu vida con la ausencia. El duelo complicado o prolongado puede beneficiarse especialmente de un abordaje profesional.",
    biopsychosocial: "El duelo afecta el bienestar biológico (alteraciones del sueño, apetito, sistema inmunológico), psicológico (emociones, pensamientos, memoria) y social (relaciones, rol social, red de apoyo).",
    techniques: ["Terapia centrada en emociones", "Narrativa", "Mindfulness", "ACT", "Ritualización"],
    showEmergencyBanner: false,
  },
  {
    slug: "pareja",
    title: "Problemas de pareja",
    category: "relaciones",
    summary:
      "Las relaciones no son perfectas, pero sí pueden ser sanas. Si la distancia, los conflictos o la incomodidad dominan tu relación, hay caminos para recuperar la conexión.",
    description:
      "Los problemas de pareja pueden incluir comunicación defensiva, distancia emocional, conflictos recurrentes, infidelidad, celos, dificultades en la sexualidad o diferencias en la crianza. La terapia de pareja no busca determinar quién tiene la razón, sino comprender los patrones de interacción que generan malestar y construir nuevas formas de relacionarse. Un espacio terapéutico puede ayudarles a reconnectar, mejorar la comunicación y fortalecer su vínculo.",
    biopsychosocial: "Los conflictos de pareja involucran dinámicas biológicas (apego, neuroquímica del vínculo), psicológicos (historias personales, expectativas) y sociales (roles, familia extensa, contexto cultural).",
    techniques: ["Terapia de pareja (EFT)", "Comunicación no violenta", "Terapia sistémica", "Mindfulness relacional"],
    showEmergencyBanner: false,
  },
  {
    slug: "autoestima",
    title: "Autoestima",
    category: "relaciones",
    summary:
      "La forma en que te hablas a ti mismo/a define cómo vives. Construir una autoestima sana es posible, incluso cuando parece imposible.",
    description:
      "Una autoestima baja puede manifestarse como autocrítica constante, dificultad para aceptar cumplidos, miedo al rechazo, comparación con otros, límites difusos y una sensación de no ser suficiente. La terapia te ayuda a identificar las raíces de esa voz interna crítica y a construir una relación más compasiva contigo mismo/a. No se trata de arrogancia, sino de reconocer tu valor inherente como persona.",
    biopsychosocial: "La autoestima se forma por la interacción de factores biológicos (temperamento), psicológicos (creencias sobre uno mismo, experiencias tempranas) y sociales (validación, pertenencia, cultura).",
    techniques: ["Terapia Cognitivo-Conductual", "Autocompasión (Kristin Neff)", "ACT", "Reestructuración cognitiva", "Mindfulness"],
    showEmergencyBanner: false,
  },
  {
    slug: "adolescencia",
    title: "Adolescencia",
    category: "desarrollo",
    summary:
      "La adolescencia es una etapa de cambios intensos. Acompañar a un adolescente en su proceso de construcción de identidad es fundamental.",
    description:
      "La adolescencia trae consigo cambios físicos, emocionales y sociales profundos. Puede manifestarse como irritabilidad, aislamiento, bajo rendimiento académico, conflictos familiares, experimentación con sustancias o dificultades con la identidad. El acompañamiento terapéutico ofrece un espacio seguro donde el adolescente puede expresarse sin juicio, comprender sus emociones y desarrollar herramientas para navegar esta etapa. Es importante que los padres también participen cuando sea necesario.",
    biopsychosocial: "La adolescencia involucra cambios neurológicos (maduración prefrontal), psicológicos (identidad, autonomía) y sociales (presión de grupo, redes sociales, familia).",
    techniques: ["Terapia Cognitivo-Conductual", "Mindfulness", "Arteterapia", "Terapia narrativa", "Entrevista motivacional"],
    showEmergencyBanner: true,
  },
  {
    slug: "crianza",
    title: "Crianza",
    category: "desarrollo",
    summary:
      "Ser padre o madre no tiene manual. Si sientes dudas, frustración o agotamiento en tu rol parental, no estás solo/a.",
    description:
      "La crianza puede generar ansiedad, culpa, agotamiento y dudas sobre si lo estamos haciendo bien. Los conflictos con los hijos, las diferencias de crianza en la pareja y la presión social son situaciones comunes. La terapia de crianza te brinda herramientas prácticas para mejorar la relación con tus hijos, establecer límites saludables y cuidar tu bienestar emocional como padre o madre. Un padre o madre que se cuida puede cuidar mejor a sus hijos.",
    biopsychosocial: "La crianza involucra factores biológicos (apego, regulación emocional), psicológicos (propia historia de apego, creencias) y sociales (cultura, red de apoyo, políticas públicas).",
    techniques: ["Entrevista motivacional", "Psicoeducación", "Terapia Cognitivo-Conductual", "Mindfulness parental"],
    showEmergencyBanner: false,
  },
  {
    slug: "burnout",
    title: "Burnout",
    category: "laboral",
    summary:
      "El agotamiento profesional no es un signo de debilidad. Es una señal de que algo en tu relación con el trabajo necesita cambiar.",
    description:
      "El burnout o síndrome de desgaste profesional se caracteriza por agotamiento emocional, despersonalización y baja realización personal. Afecta especialmente a profesionales de salud, educación y servicio. No es simplemente 'estar cansado', sino un estado de agotamiento profundo que afecta tu salud física, emocional y relacional. El tratamiento aborda no solo los síntomas, sino las condiciones que llevaron al agotamiento y la construcción de un nuevo equilibrio.",
    biopsychosocial: "El burnout involucra factores biológicos (cortisol, sistema inmunológico), psicológicos (perfeccionismo, dificultad para decir no) y sociales (cultura organizacional, carga laboral, falta de reconocimiento).",
    techniques: ["ACT", "Mindfulness", "Gestión del estrés", "Terapia Cognitivo-Conductual", "Límites personales"],
    showEmergencyBanner: false,
  },
  {
    slug: "tdah",
    title: "TDAH",
    category: "neurodesarrollo",
    summary:
      "El TDAH no es falta de voluntad. Es una diferencia neurológica que requiere comprensión, herramientas y acompañamiento adecuado.",
    description:
      "El Trastorno por Déficit de Atención con o sin Hiperactividad (TDAH) afecta la capacidad de regular la atención, las emociones y la conducta. En adultos, puede manifestarse como dificultad para concentrarse, desorganización, procrastinación, impulsividad emocional y dificultad para mantener relaciones. El TDAH no diagnosticado puede generar frustración, baja autoestima y problemas en el trabajo y las relaciones. La terapia ayuda a desarrollar estrategias prácticas para manejar los síntomas y mejorar tu calidad de vida.",
    biopsychosocial: "El TDAH involucra factores biológicos (neurotransmisores, estructura cerebral), psicológicos (autorregulación, funciones ejecutivas) y sociales (entorno educativo, laboral, familiar).",
    techniques: ["Psicoeducación", "Entrenamiento en funciones ejecutivas", "Mindfulness", "TCC", "Organización y estructura"],
    showEmergencyBanner: false,
  },
  {
    slug: "trauma",
    title: "Trauma",
    category: "trauma",
    summary:
      "El trauma no define quién eres. Con el acompañamiento adecuado, es posible sanar y reconstruir tu sentido de seguridad y confianza.",
    description:
      "El trauma puede ser el resultado de experiencias dolorosas como accidentes, abuso, violencia, pérdida traumática o cualquier evento que haya superado tu capacidad de procesamiento. Sus efectos pueden incluir flashback, hipervigilancia, evitación, dificultad para confiar, alteraciones del sueño y desregulación emocional. El trauma no es lo que pasó, sino lo que quedó encapsulado en tu sistema nervioso. Con un enfoque adecuado, tu cuerpo y mente pueden aprender a sentirse seguros de nuevo.",
    biopsychosocial: "El trauma afecta el sistema nervioso (biológico), la forma de procesar recuerdos y emociones (psicológico), y la capacidad de conexión y confianza (social).",
    techniques: ["EMDR", "Terapia basada en trauma", "Somatic Experiencing", "Mindfulness", "Psicoeducación sobre trauma"],
    showEmergencyBanner: true,
  },
] as const;

export const SPECIALTY_CATEGORIES = [
  { id: "emocional", label: "Salud emocional" },
  { id: "relaciones", label: "Relaciones" },
  { id: "desarrollo", label: "Desarrollo" },
  { id: "laboral", label: "Ámbito laboral" },
  { id: "neurodesarrollo", label: "Neurodesarrollo" },
  { id: "trauma", label: "Trauma" },
] as const;

export const FAQS = [
  {
    question: "¿Cómo sé si necesito terapia psicológica?",
    answer:
      "Si sientes que tus emociones interfieren con tu vida diaria, relaciones, trabajo o bienestar general, la terapia puede ayudarte. No necesitas estar en una crisis para buscar acompañamiento profesional. Muchas personas inician terapia simplemente porque quieren conocerse mejor y mejorar su calidad de vida.",
  },
  {
    question: "¿Cuánto dura cada sesión?",
    answer:
      "Las sesiones tienen una duración de 50 minutos. Este tiempo permite un espacio suficiente para trabajar de manera profunda sin sobrecargarte emocionalmente.",
  },
  {
    question: "¿Atiendes de manera virtual?",
    answer:
      "Sí. Ofrezco terapia virtual por videollamada para personas que no pueden asistir al consultorio o que prefieren la comodidad de su hogar. La confidencialidad y la calidad de la atención se mantienen en ambas modalidades.",
  },
  {
    question: "¿Cuál es el costo de la terapia?",
    answer:
      "Los valores se confirman al agendar la primera cita. El costo varía según la modalidad (presencial o virtual) y la duración del tratamiento. No dudes en escribirme para recibir información actualizada.",
  },
  {
    question: "¿Qué debo traer a mi primera sesión?",
    answer:
      "No necesitas preparar nada especial. Solo necesitas llegar con la disposición de hablar y ser escuchado/a. Si lo deseas, puedes escribir previamente las razones que te llevaron a buscar terapia o las situaciones que te gustaría abordar.",
  },
  {
    question: "¿La información que comparto es confidencial?",
    answer:
      "Sí. Todo lo que compartas en terapia es estrictamente confidencial, conforme a las normas éticas y legales de la psicología en Colombia. Tu información personal y clínica está protegida por la Ley 1581 de 2012 sobre protección de datos personales sensibles.",
  },
  {
    question: "¿Puedo agendar una sesión de prueba?",
    answer:
      "La primera sesión funciona como una sesión de evaluación inicial. En ella podremos conocernos, entender tu situación y decidir juntos si el enfoque terapéutico es adecuado para ti. No hay compromiso de continuar si no te sientes cómodo/a.",
  },
  {
    question: "¿Trabajas con niños o adolescentes?",
    answer:
      "Mi enfoque principal es la atención de adultos. Si necesitas apoyo para niños o adolescentes, puedo recomendarte colegas especializados en población infantojuvenil.",
  },
] as const;
