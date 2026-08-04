import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20 bg-sage-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
          Cuando estés listo/a, aquí estoy
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          La primera sesión es de evaluación. Es un espacio seguro para
          conversar sobre lo que estás sintiendo y decidir juntos si este
          acompañamiento tiene sentido para ti.
        </p>
        <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" variant="secondary" size="lg">
          Agendar Mi Primera Sesión
        </Button>
      </div>
    </section>
  );
}
