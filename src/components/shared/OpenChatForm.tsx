import { useState } from "react";
import { FormGroup } from "./FormGroup";
import { SubmitButton } from "../ui/SubmitButton";
import { ErrorMessage } from "../ui/ErrorMesage";
import { formatPhoneNumber } from "../../lib/utils/phone";

export function OpenChatForm({
  onOpenChat,
}: {
  onOpenChat: (chatId: string) => void;
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultCheckPhone = formatPhoneNumber(phone);
    if (!resultCheckPhone.isValid) {
      setError(resultCheckPhone.error);
      return;
    }
    onOpenChat(resultCheckPhone.chatId);
    setPhone("");
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <FormGroup
        id="phone"
        title="PHONE"
        inputType="text"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (error) setError(null);
        }}
      />
      <span className="text-xs text-slate-400">
        International format, e.g. 79991234567
      </span>
      <ErrorMessage error={error} />
      <SubmitButton disabled={phone.trim() === ""}>OPEN CHAT</SubmitButton>
    </form>
  );
}
