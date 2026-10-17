import { useEffect, useRef, useState, useTransition } from "react";
import type { Credentials, UIMessage } from "../../types";
import { greenApi } from "../../api/greenApi";
import { cn } from "../../lib/utils/tailwindClasses";
import { SendMessageForm } from "./SendMessageForm";

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
  const msgsRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isPending, startTransition] = useTransition();
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
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages]);
  if (!chatId)
    return (
      <div className="flex text-white text-2xl font-bold p-10 items-center justify-center">
        Create a chat to start a conversation.
      </div>
    );
  return (
    <div className="w-full h-screen flex flex-col gap-4 p-4">
      <header className="bg-slate-300 p-5 rounded-2xl flex items-center justify-between">
        <p>Chat: {chatId}</p>
        <button onClick={onCloseChat} className="md:hidden block">
          ⬅ BACK
        </button>
      </header>
      <div
        ref={msgsRef}
        className="w-full flex-1 flex flex-col  overflow-y-auto gap-8"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "p-4 text-white first:mt-auto",
              m.isOutgoing
                ? "bg-blue-600 self-end rounded-t-2xl rounded-bl-2xl"
                : "bg-slate-400 self-start rounded-t-2xl rounded-br-2xl",
            )}
          >
            {m.text}
          </div>
        ))}
      </div>
      <SendMessageForm isPending={isPending} onSend={handleSend} />
    </div>
  );
}
