import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { SendMessageForm } from "./SendMessageForm";

describe("Тест компонента SendMessageForm", () => {
  const user = userEvent.setup();
  const handleSend = vi.fn();
  test("Защита от отправки пустых сообщений", async () => {
    render(<SendMessageForm onSend={handleSend} isPending={false} />);
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button");
    await user.type(input, "   ");
    expect(btn).toBeDisabled();
  });
  test("Успешная отправка и очистка инпута", async () => {
    render(<SendMessageForm onSend={handleSend} isPending={false} />);
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button");
    await user.type(input, "Привет");
    await user.click(btn);
    expect(handleSend).toHaveBeenCalledWith("Привет");
    expect(input).toHaveValue("");
  });
  test("Кнопка заблокирована, когда идет отправка (isPending=true)", async () => {
    render(<SendMessageForm onSend={handleSend} isPending={true} />);
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button");
    await user.type(input, "Привет");
    expect(btn).toBeDisabled();
  });
});
