import { useState } from "react";
import { SubmitButton } from "../ui/SubmitButton";
import SendRow from "../icon/SendRow";

interface SendMessageFormProps {
  onSend: (data: string) => void;
  isPending: boolean;
}

export function SendMessageForm({ onSend, isPending }: SendMessageFormProps) {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center justify-center gap-2"
    >
      <input
        type="text"
        placeholder="message..."
        className="flex-1 bg-amber-50/60 rounded-2xl p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <SubmitButton disabled={text.trim() === "" || isPending}>
        <SendRow className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
}
