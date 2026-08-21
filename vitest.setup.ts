import "@testing-library/jest-dom/vitest"

// jsdom no implementa scrollTo; el flujo de autoevaluación lo usa para
// llevar cada paso al inicio de la pantalla.
window.scrollTo = () => {}
