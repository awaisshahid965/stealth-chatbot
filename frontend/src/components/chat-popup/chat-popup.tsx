// ChatPopup.tsx
import React, { useEffect } from "react";
import ChatPopupMessage from "./chat-popup-message";
import ChatPopupInputBox from "./chat-popup-input";
import ChatPopupButton from "./chat-popup-button";

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
            display: opened ? 'block' : "none"
        }}
        className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white rounded-lg overflow-hidden border border-[#e5e7eb] w-[440px] h-[634px]"
      >
        <div className="flex flex-col space-y-1.5 p-4 text-center bg-blue-400">
          <h2 className="font-semibold text-xs uppercase tracking-normal text-white">
            Ask Stealth
          </h2>
        </div>

        <div className="pr-4 h-[520px] overflow-y-auto px-4" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <ChatPopupMessage
              key={index}
              isUser={msg.isUser}
              message={msg.text}
            />
          ))}
        </div>

        <div className="px-2">
          <ChatPopupInputBox disableButton={disableButton} onSend={onSend} />
        </div>
      </div>
      <ChatPopupButton
        onClick={() => setOpened(!opened)}
      >
        {opened ? <span className="text-3xl font-light">&times;</span> : <span>Ask</span>}
      </ChatPopupButton>
    </>
  );
};

export default ChatPopup;
