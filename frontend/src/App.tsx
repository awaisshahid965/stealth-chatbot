import React, { useState } from "react";
import ChatPopup from "./components/chat-popup/chat-popup";

const API_URL = import.meta.env.VITE_API_URL;

interface IMessage {
  isUser: boolean;
  text: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Array<IMessage>>([
    { isUser: false, text: "Hi! 👋 How can I assist you today?" }
  ]);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  const handleSend = async (message: string) => {
    setIsAnswering(true);
    setMessages((prev) => [...prev, { isUser: true, text: message }]);

    const response = await fetch(`${API_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: message }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = ""; // To accumulate the bot's response

      // Create a new message for the bot response
      setMessages((prev) => [...prev, { isUser: false, text: "" }]);

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const text = decoder.decode(value, { stream: true });
          const chunks = text.split("\n").filter(Boolean);

          chunks.forEach((chunk) => {
            accumulatedText += chunk;
          });

          setMessages((prev) => {
            const lastNode = prev[prev.length - 1];
            const updatedNode = { ...lastNode, text: accumulatedText };

            return [...prev.slice(0, -1), updatedNode];
          });
        }
      }
    }

    setIsAnswering(false);
  };

  return (
    <ChatPopup
      messages={messages}
      onSend={handleSend}
      disableButton={isAnswering}
    />
  );
};

export default App;
