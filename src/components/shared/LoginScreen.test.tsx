import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { LoginScreen } from "./LoginScreen";
describe("Тест компонента LoginScreen", () => {
  const handleLoginOn = vi.fn();
  const user = userEvent.setup();
  test("Кнопка заблокирована по умолчанию", () => {
    render(<LoginScreen onLogin={handleLoginOn} />);
    const btn = screen.getByRole("button", { name: /LOG IN/i });
    expect(btn).toBeDisabled();
  });
  test("Некорректный IdInstanse - ожидается вывод ошибки", async () => {
    render(<LoginScreen onLogin={handleLoginOn} />);
    const btn = screen.getByRole("button", { name: /LOG IN/i });
    const idInstanceInput = screen.getByLabelText(/ID INSTANCE/i);
    const apiTokenInstanceInput = screen.getByLabelText(/API TOKEN INSTANCE/i);
    const error = screen.getByRole("paragraph");
    await user.type(idInstanceInput, "121218dgdh181");
    await user.type(apiTokenInstanceInput, "hwiueh9e782h39373");
    await user.click(btn);
    expect(error).toHaveTextContent(
      "The instance ID must consist only of digits.",
    );
  });
});
