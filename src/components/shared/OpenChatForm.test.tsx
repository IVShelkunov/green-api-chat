import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { OpenChatForm } from "./OpenChatForm";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("Тест компонента OpenChatForm:", () => {
  const handleChatOn = vi.fn();
  const user = userEvent.setup();
  test("Кнопка заблокирована по умолчанию:", () => {
    render(<OpenChatForm onOpenChat={handleChatOn} />);
    const btn = screen.getByRole("button", { name: /open chat/i });
    expect(btn).toBeDisabled();
  });
  test("Ввод некорректного номера-ожидается вывод ошибки", async () => {
    render(<OpenChatForm onOpenChat={handleChatOn} />);
    const btn = screen.getByRole("button", { name: /open chat/i });
    const input = screen.getByRole("textbox");
    const error = screen.getByRole("paragraph");
    await user.type(input, "123");
    await user.click(btn);

    expect(handleChatOn).not.toHaveBeenCalled();
    expect(error).toHaveTextContent("Enter a valid phone number");
  });
  test("Ввод корректного номера - ожидается успех", async () => {
    render(<OpenChatForm onOpenChat={handleChatOn} />);
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button", { name: /open chat/i });
    await user.type(input, "79888939353");
    await user.click(btn);
    expect(handleChatOn).toHaveBeenCalledWith("79888939353@c.us");
  });
});
