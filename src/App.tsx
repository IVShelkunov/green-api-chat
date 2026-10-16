import { useState } from "react";
import { greenApi } from "./api/greenApi";

function App() {
  const [status, setStatus] = useState("");

  // Твои данные из шага 1
  const idInstance = "410022770198";
  const apiTokenInstance = "b1df41e9666e435fbd11c179d12358c0574f9dec319b411f8b";

  const handleSend = async () => {
    try {
      const data = await greenApi.sendMessage(
        { idInstance, apiTokenInstance },
        { chatId: "79888939353@c.us", message: "Hello Ilya!" },
      );
      setStatus(data.idMessage);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Тест отправки GREEN-API</h2>
      <button
        onClick={handleSend}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Отправить тестовое сообщение
      </button>
      <p>{status}</p>
    </div>
  );
}

export default App;
