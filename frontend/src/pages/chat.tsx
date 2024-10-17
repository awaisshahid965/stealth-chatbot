import React from "react";
import { useChat } from "../hooks/use-chat";
import ChatPopup from "../components/chat-popup/chat-popup";

const Chat: React.FC = () => {
  const {
    isAnswering,
    chatMessages,
    processUserChatQuery,
    proccessFailedChatQuery,
  } = useChat();

  return (
    <ChatPopup
      disableButton={isAnswering}
      messages={chatMessages}
      onSend={processUserChatQuery}
      onFail={proccessFailedChatQuery}
    />
  );
};

export default Chat;
