import { useState } from "react";
import type { Credentials } from "../../types";
import { FormGroup } from "./FormGroup";

export function LoginScreen({
  onLogin,
}: {
  onLogin: (data: Credentials) => void;
}) {
  const [loginData, setLoginData] = useState<Credentials>({
    idInstance: "",
    apiTokenInstance: "",
  });
  const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(loginData);
  };
  return (
    <div className="w-full h-screen md:w-auto md:h-auto flex flex-col items-center justify-center gap-4 bg-linear-to-b from-sky-200 to-white p-6 rounded-2xl">
      <h2 className="text-2xl font-medium tracking-widest">LOGIN</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button
          disabled={
            !loginData.idInstance.trim() || !loginData.apiTokenInstance.trim()
          }
          className="disabled:bg-blue-500/70 disabled:cursor-not-allowed  bg-blue-500 hover:bg-blue-500/70 p-2 rounded-2xl text-white cursor-pointer"
          type="submit"
        >
          LOG IN
        </button>
      </form>
    </div>
  );
}
