import { useState } from "react";
import { cn } from "../../lib/utils/tailwindClasses";
import { OpenChatForm } from "./OpenChatForm";
import type { Credentials } from "../../types";
import { ChatScreen } from "./ChatScreen";
import ExitCross from "../icon/ExitCross";
interface ChatLayoutProps {
  credentials: Credentials;
  onLogout: () => void;
}
export function ChatLayout({ credentials, onLogout }: ChatLayoutProps) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const handleOpenChat = (chatId: string) => {
    setActiveChatId(chatId);
  };
  return (
    <div className={cn(" flex md:flex-row w-full h-screen")}>
      <div
        className={cn(
          "bg-white md:w-1/3 w-full h-full flex flex-col items-center ",
          activeChatId && "md:flex hidden",
        )}
      >
        <div className="w-full p-4 flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-bold">idInstance:</p>
            <p>{credentials.idInstance}</p>
          </div>
          <div className="">
            <button
              className="hover:text-red-500 cursor-pointer"
              onClick={onLogout}
            >
              <span className="md:inline hidden">EXIT</span>
              <ExitCross className="w-10 h-10 md:hidden block" />
            </button>
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col items-center justify-center p-4">
          <OpenChatForm onOpenChat={handleOpenChat} />
        </div>
      </div>
      <div
        className={cn(
          "w-full h-full flex-col flex-1 items-center justify-center ",
          activeChatId ? "flex " : "md:flex  hidden",
        )}
      >
        <ChatScreen
          onCloseChat={() => setActiveChatId(null)}
          chatId={activeChatId}
          credentials={credentials}
        />
      </div>
    </div>
  );
}
