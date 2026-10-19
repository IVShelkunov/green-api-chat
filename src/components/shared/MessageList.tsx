import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils/tailwindClasses";
import type { UIMessage } from "../../types";

export function MessageList({ messages }: { messages: UIMessage[] }) {
  const msgsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages]);
  return (
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
  );
}
