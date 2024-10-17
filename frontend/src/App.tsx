// App.tsx
import React, { useState } from "react";
import ChatPopup from "./components/chat-popup/chat-popup";

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

    const response = await fetch("http://localhost:8000/query/", {
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
          // Split by new line and filter out empty strings
          const chunks = text.split("\n").filter(Boolean);
          console.log(chunks);

          chunks.forEach((chunk) => {
            accumulatedText += chunk; // Accumulate the text
          });

          // Update the last message with accumulated text
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
