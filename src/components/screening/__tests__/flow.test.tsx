import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScreeningFlow } from "../ScreeningFlow";
import { scorePhq9, scoreGad7 } from "@/lib/instruments";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={typeof href === "string" ? href : "#"} {...props}>
      {children}
    </a>
  ),
}));

type User = ReturnType<typeof userEvent.setup>;

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function goToScaleSelect(user: User) {
  await user.click(
    screen.getByRole("button", { name: /empezar autoevaluación/i })
  );
}

async function choosePhq9(user: User) {
  await user.click(screen.getByRole("radio", { name: /estado de ánimo/i }));
  await user.click(screen.getByRole("button", { name: "Continuar" }));
}

async function acceptConsent(user: User) {
  await user.click(screen.getByRole("checkbox"));
  await user.click(screen.getByRole("button", { name: "Continuar" }));
}

async function answerCurrent(user: User, value: number) {
  const radios = screen.getAllByRole("radio");
  await user.click(radios[value]);
  await user.click(screen.getByRole("button", { name: "Continuar" }));
}

async function completePhq9(user: User, values: number[]) {
  await goToScaleSelect(user);
  await choosePhq9(user);
  await acceptConsent(user);
  for (const value of values) {
    await answerCurrent(user, value);
  }
}

describe("ScreeningFlow", () => {
  it("1. no avanza sin responder la pregunta (required)", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, []);

    expect(screen.getByText("Pregunta 1 de 9")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      /selecciona una opción/i
    );
    expect(screen.getByText("Pregunta 1 de 9")).toBeInTheDocument();
  });

  it("2. el puntaje del PHQ-9 coincide con scorePhq9", async () => {
    const map = {
      1: 1, 2: 2, 3: 3, 4: 0, 5: 1, 6: 2, 7: 3, 8: 0, 9: 0,
    } as const;
    expect(scorePhq9(map)).toMatchObject({ total: 12, level: "moderada" });

    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [1, 2, 3, 0, 1, 2, 3, 0, 0]);

    expect(screen.getByText("Resultado orientativo")).toBeInTheDocument();
    expect(
      screen.getByText(/Total orientativo: 12 de 27/)
    ).toBeInTheDocument();
    expect(screen.getByText("Nivel orientativo moderado")).toBeInTheDocument();
  });

  it("2b. el puntaje del GAD-7 coincide con scoreGad7", async () => {
    const map = { 1: 1, 2: 2, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1 } as const;
    expect(scoreGad7(map)).toMatchObject({ total: 10, level: "moderada" });

    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await goToScaleSelect(user);
    await user.click(screen.getByRole("radio", { name: /ansiedad/i }));
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    await acceptConsent(user);
    for (const value of [1, 2, 1, 2, 1, 2, 1]) {
      await answerCurrent(user, value);
    }

    expect(
      screen.getByText(/Total orientativo: 10 de 21/)
    ).toBeInTheDocument();
    expect(screen.getByText("Nivel orientativo moderado")).toBeInTheDocument();
  });

  it("3. nunca mezcla respuestas entre escalas al usar ambas", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await goToScaleSelect(user);
    await user.click(screen.getByRole("radio", { name: /ambas/i }));
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    await acceptConsent(user);

    for (let i = 0; i < 9; i++) {
      await answerCurrent(user, 0);
    }
    for (let i = 0; i < 7; i++) {
      await answerCurrent(user, 3);
    }

    expect(screen.getByText(/Total orientativo: 0 de 27/)).toBeInTheDocument();
    expect(
      screen.getByText(/Total orientativo: 21 de 21/)
    ).toBeInTheDocument();
    expect(screen.getByText("Nivel orientativo bajo")).toBeInTheDocument();
    expect(screen.getByText("Nivel orientativo elevado")).toBeInTheDocument();
  });

  it("4. el resultado es orientativo y no afirma diagnósticos", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const text = document.body.textContent ?? "";
    expect(text).toMatch(/orientativ/i);
    expect(text).not.toMatch(/usted tiene/i);
    expect(text).not.toMatch(/sufre de/i);
    expect(text).toMatch(/no es un diagnóstico/i);
  });

  it("5. ítem 9 del PHQ-9 > 0 muestra la pantalla de seguridad", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0, 0, 0, 0, 0, 0, 0, 0, 1]);

    expect(
      screen.getByText(/Gracias por responder con honestidad/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /123/ })).toHaveAttribute(
      "href",
      "tel:123"
    );
    expect(screen.getByRole("link", { name: /106/ })).toHaveAttribute(
      "href",
      "tel:106"
    );
    expect(screen.getByRole("link", { name: /125/ })).toHaveAttribute(
      "href",
      "tel:125"
    );
    expect(
      screen.getByRole("link", { name: /Buscar ayuda profesional ahora/i })
    ).toHaveAttribute(
      "href",
      "https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo"
    );

    await user.click(
      screen.getByRole("button", { name: /Continuar y ver mi resultado/i })
    );
    expect(screen.getByText("Resultado orientativo")).toBeInTheDocument();
  });

  it("6. no ejecuta analítica ni endpoints de analytics", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(
      (window as unknown as { dataLayer?: unknown }).dataLayer
    ).toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      document.querySelector('script[src*="gtag"], script[src*="analytics"]')
    ).toBeNull();

    await user.click(
      screen.getByRole("button", { name: /No, solo quiero ver mi resultado/i })
    );
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      (window as unknown as { dataLayer?: unknown }).dataLayer
    ).toBeUndefined();
  });

  it("7. navegación por teclado: botones y radios alcanzables", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0]);

    expect(screen.getByText("Pregunta 2 de 9")).toBeInTheDocument();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(4);
    const back = screen.getByRole("button", { name: "Anterior" });
    const cont = screen.getByRole("button", { name: "Continuar" });
    expect(back).not.toBeDisabled();
    expect(cont).not.toBeDisabled();
    for (const radio of radios) {
      expect(radio).not.toBeDisabled();
      expect(radio).not.toHaveAttribute("tabindex", "-1");
    }

    (document.activeElement as HTMLElement | null)?.blur?.();
    await user.tab();
    expect(back).toHaveFocus();
    await user.tab();
    expect(radios[0]).toHaveFocus();
    await user.tab();
    expect(cont).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(screen.getByRole("alert")).toHaveTextContent(
      /selecciona una opción/i
    );
  });

  it("8. el lead es opcional: se finaliza sin enviarlo", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(screen.getByText("Resultado orientativo")).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /No, solo quiero ver mi resultado/i })
    );
    expect(screen.getByText("Has completado la autoevaluación")).toBeInTheDocument();
  });

  it("9. el resultado se muestra aunque se omita el lead", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

    expect(screen.getByText("Resultado orientativo")).toBeInTheDocument();
    expect(screen.getByText(/Total orientativo: 0 de 27/)).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /No, solo quiero ver mi resultado/i })
    );
    expect(screen.getByText("Has completado la autoevaluación")).toBeInTheDocument();
  });

  it("10. nunca guarda puntajes ni respuestas en la URL", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    expect(window.location.search).toBe("");

    await completePhq9(user, [1, 2, 3, 0, 1, 2, 3, 0, 0]);

    expect(window.location.search).toBe("");
    expect(new URLSearchParams(window.location.search).toString()).toBe("");
    expect(
      screen.getByText(/Total orientativo: 12 de 27/)
    ).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });

  it("11. fallo de red del lead muestra error genérico", async () => {
    fetchMock.mockRejectedValue(new Error("Network down"));
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

    await user.type(screen.getByLabelText("Tu nombre"), "Ana Pérez");
    await user.type(
      screen.getByLabelText(/Teléfono o WhatsApp/),
      "3001234567"
    );
    await user.click(
      screen.getByRole("checkbox", { name: /autorizo que mis datos/i })
    );
    await user.click(
      screen.getByRole("button", { name: /Enviar y que me oriente/i })
    );

    expect(
      await screen.findByText("Ocurrió un error. Intenta de nuevo.")
    ).toBeInTheDocument();
    expect(screen.queryByText(/Network down/)).not.toBeInTheDocument();
  });

  it("12. muestra exactamente una pregunta por pantalla", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0]);

    expect(document.querySelectorAll("legend")).toHaveLength(1);
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.getByText("Pregunta 2 de 9")).toBeInTheDocument();
  });

  it("13. el consentimiento debe aceptarse antes de las preguntas", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await goToScaleSelect(user);
    await choosePhq9(user);

    await user.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      /debes aceptar el tratamiento/i
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.queryByText("Pregunta 1 de 9")).not.toBeInTheDocument();

    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByText("Pregunta 1 de 9")).toBeInTheDocument();
  });

  it("14. reiniciar vuelve al inicio con estado limpio", async () => {
    const user = userEvent.setup();
    render(<ScreeningFlow />);
    await completePhq9(user, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await user.click(
      screen.getByRole("button", { name: /No, solo quiero ver mi resultado/i })
    );
    await user.click(
      screen.getByRole("button", { name: /Reiniciar la evaluación/i })
    );

    expect(
      screen.getByRole("button", { name: /empezar autoevaluación/i })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /empezar autoevaluación/i })
    );
    expect(
      screen.getByText(/¿Qué te gustaría explorar\?/i)
    ).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: /estado de ánimo/i }));
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    await acceptConsent(user);
    expect(screen.getByText("Pregunta 1 de 9")).toBeInTheDocument();
  });
});
