import { useState } from "react";
import { LoginScreen } from "./components/shared/LoginScreen";
import type { Credentials } from "./types";
import { ChatLayout } from "./components/shared/ChatLayout";

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(() => {
    try {
      const saved = localStorage.getItem("auth");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const handleLogin = (data: Credentials) => {
    setCredentials(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };
  const handleLogout = () => {
    setCredentials(null);
    localStorage.removeItem("auth");
  };
  return (
    <main className="relative w-full h-screen bg-linear-to-br from-blue-950 via-sky-500 to-violet-800 flex items-center justify-center">
      {credentials ? (
        <ChatLayout onLogout={handleLogout} credentials={credentials} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </main>
  );
}

export default App;
