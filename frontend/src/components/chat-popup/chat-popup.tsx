// ChatPopup.tsx
import React, { useEffect } from "react";
import ChatPopupMessage from "./chat-popup-message";
import ChatPopupInputBox from "./chat-popup-input";
import ChatPopupButton from "./chat-popup-button";
import ChatIcon from "../../icons/chat-icon";
import CloseIcon from "../../icons/close-icon";

interface Message {
  isUser: boolean;
  text: string;
}

interface ChatPopupProps {
  messages: Message[];
  onSend: (message: string) => void;
  disableButton?: boolean;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  messages,
  onSend,
  disableButton,
}) => {
  const [opened, setOpened] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        style={{
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            display: opened ? 'flex' : "none"
        }}
        className="flex-col fixed bottom-[calc(4rem+1.5rem)] right-[50%] translate-x-[50%] w-[768px] bg-white rounded-lg overflow-hidden border border-[#e5e7eb] h-[634px]"
      >
        <div className="flex flex-col space-y-1.5 p-4 text-center bg-blue-400">
          <h2 className="font-semibold text-xs uppercase tracking-normal text-white">
            Ask Stealth
          </h2>
        </div>

        <div className="pr-4 flex-1 overflow-y-auto px-4" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <ChatPopupMessage
              key={index}
              isUser={msg.isUser}
              message={msg.text}
            />
          ))}
        </div>

        <div className="px-2 pb-4">
          <ChatPopupInputBox disableButton={disableButton} onSend={onSend} />
        </div>
      </div>
      <ChatPopupButton
        onClick={() => setOpened(!opened)}
      >
        {opened ? <CloseIcon /> : <ChatIcon />}
      </ChatPopupButton>
    </>
  );
};

export default ChatPopup;
