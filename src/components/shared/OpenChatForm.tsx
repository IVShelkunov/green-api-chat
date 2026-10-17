import { useState } from "react";
import { FormGroup } from "./FormGroup";
import { SubmitButton } from "../ui/SubmitButton";

export function OpenChatForm({
  onOpenChat,
}: {
  onOpenChat: (chatId: string) => void;
}) {
  const [phone, setPhone] = useState("");
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenChat(`${phone.replace(/ /g, "")}@c.us`);
    setPhone("");
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <FormGroup
        id="phone"
        title="PHONE"
        inputType="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <SubmitButton disabled={phone.trim() === ""}>OPEN CHAT</SubmitButton>
    </form>
  );
}
