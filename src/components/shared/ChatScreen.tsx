import { useEffect, useState, useTransition } from "react";
import type { Credentials, UIMessage } from "../../types";
import { greenApi } from "../../api/greenApi";
import { SendMessageForm } from "./SendMessageForm";
import { MessageList } from "./MessageList";

interface ChatScreenProps {
  credentials: Credentials;
  chatId: string | null;
  onCloseChat: () => void;
}
export function ChatScreen({
  credentials,
  chatId,
  onCloseChat,
}: ChatScreenProps) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isPending, startTransition] = useTransition();
  const handleCloseChat = () => {
    onCloseChat();
    setMessages([]);
  };
  const handleSend = (msg: string) => {
    startTransition(async () => {
      if (!chatId) return;
      try {
        const data = await greenApi.sendMessage(credentials, {
          chatId,
          message: msg,
        });
        setMessages((prev) => [
          ...prev,
          { id: data.idMessage, text: msg, isOutgoing: true },
        ]);
      } catch (err) {
        console.error(err);
      }
    });
  };
  useEffect(() => {
    if (!chatId) return;
    let isMounted = true;
    const poll = async () => {
      try {
        const res = await greenApi.receiveNotification(credentials);
        console.log("Пришло от сервера:", res);
        if (res && res.receiptId) {
          if (
            res.body.typeWebhook === "incomingMessageReceived" &&
            res.body.senderData.chatId === chatId
          ) {
            const msgId = res.body.idMessage;
            const msgText = res.body?.messageData?.textMessageData?.textMessage;
            setMessages((prev) => [
              ...prev,
              { id: msgId, text: msgText, isOutgoing: false },
            ]);
          }
          await greenApi.deleteNotification(credentials, res.receiptId);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setTimeout(poll, 3000);
        }
      }
    };
    poll();
    return () => {
      isMounted = false;
    };
  }, [credentials, chatId]);
  if (!chatId)
    return (
      <div className="flex text-white text-2xl font-bold p-10 items-center justify-center">
        Create a chat to start a conversation.
      </div>
    );
  return (
    <div className="w-full h-dvh flex flex-col gap-4 p-4">
      <header className="bg-slate-300 p-5 rounded-2xl flex items-center justify-between">
        <p>Chat: {chatId}</p>
        <button
          onClick={handleCloseChat}
          className="md:hidden block text-xl font-bold"
        >
          ← BACK
        </button>
      </header>
      <MessageList messages={messages} />
      <SendMessageForm isPending={isPending} onSend={handleSend} />
    </div>
  );
}
