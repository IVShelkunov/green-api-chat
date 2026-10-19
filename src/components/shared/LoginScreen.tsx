import { useState } from "react";
import type { Credentials } from "../../types";
import { FormGroup } from "./FormGroup";
import { SubmitButton } from "../ui/SubmitButton";
import { ErrorMessage } from "../ui/ErrorMesage";
import { greenApi } from "../../api/greenApi";

export function LoginScreen({
  onLogin,
}: {
  onLogin: (data: Credentials) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<Credentials>({
    idInstance: "",
    apiTokenInstance: "",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(null);
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\d+$/.test(loginData.idInstance)) {
      setError("The instance ID must consist only of digits.");
      return;
    }
    try {
      setIsLoading(true);
      const res = await greenApi.getStateInstance(loginData);
      if (res.stateInstance === "authorized") {
        onLogin(loginData);
      }
      if (res.stateInstance === "notAuthorized") {
        setError("Instance not authorized. Scan the QR code in your account.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" h-screen w-full md:max-w-xs  md:h-auto flex flex-col items-center justify-center gap-4 bg-linear-to-b from-sky-200 to-white p-6 md:rounded-2xl">
      <h2 className="text-2xl font-medium tracking-widest">LOGIN</h2>
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <FormGroup
          id="idInstance"
          title="ID INSTANCE"
          inputType="text"
          value={loginData.idInstance}
          onChange={handleChangeInputData}
        />
        <FormGroup
          id="apiTokenInstance"
          title="API TOKEN INSTANCE"
          inputType="password"
          value={loginData.apiTokenInstance}
          onChange={handleChangeInputData}
        />
        <ErrorMessage error={error} />
        <SubmitButton
          disabled={
            !loginData.idInstance.trim() ||
            !loginData.apiTokenInstance.trim() ||
            isLoading
          }
        >
          {isLoading ? "CHECKING..." : "LOG IN"}
        </SubmitButton>
      </form>
    </div>
  );
}
