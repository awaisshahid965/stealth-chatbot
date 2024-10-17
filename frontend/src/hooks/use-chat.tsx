import { useState } from "react";
import { ChatMessages, IChatMessage } from "../types/chat.types";

const API_URL = import.meta.env.VITE_API_URL;

type ChatStateCallbackFn = (prev: ChatMessages) => ChatMessages
type ChatStateCallback = (fn: ChatStateCallbackFn) => void

/* chat processing utils */

const sendMessageToAPI = (message: string) => {
  throw new Error('testing...' + message)
  return fetch(`${API_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: message }),
  });
};

const addMessage = (text: string, isUserMessage: boolean, callback: ChatStateCallback) => {
  callback((prev) => [...prev, { isUser: isUserMessage, text }]);
};

const processStreamedChunks = (value: Uint8Array, decoder: TextDecoder, accumulatedText: string) => {
  const text = decoder.decode(value, { stream: true });
  const chunks = text.split("\n").filter(Boolean);

  chunks.forEach((chunk) => {
    accumulatedText += chunk;
  });

  return accumulatedText;
};

const handleStreamedResponse = async (body: ReadableStream, callback: ChatStateCallback) => {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let accumulatedText = "";

  addMessage("", false, callback);

  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone

    if (value) {
      accumulatedText = processStreamedChunks(value, decoder, accumulatedText);
      callback((prev) => {
        const lastMessage = prev[prev.length - 1];
        const updatedMessage: IChatMessage = { ...lastMessage, text: accumulatedText };
        return [...prev.slice(0, prev.length - 1), updatedMessage];
      });
    }

  }
};

const addProcessingFailedMessage = (failedMessageQuery: string, callback: ChatStateCallback) => {
  callback(prev => {
    const failedQueryIndex = prev.findIndex(c => c.text === failedMessageQuery)
    
    const revertedChatList = prev.slice(
      0,
      (failedQueryIndex ?? prev.length) + 1
    );

    return [
      ...revertedChatList,
      { isUser: false, text: 'Error occured while generating response', failedProcessing: true }
    ]
  })
}

export const useChat = () => {
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessages>([
    { isUser: false, text: "Hi! 👋 How can I assist you today?" },
  ]);

  const processUserChatQuery = async (message: string) => {
    setIsAnswering(true);
    addMessage(message, true, setChatMessages);
  
    try {
      const response = await sendMessageToAPI(message);
      if (response.body) {
        await handleStreamedResponse(response.body, setChatMessages);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      addProcessingFailedMessage(message, setChatMessages)
    } finally {
      setIsAnswering(false);
    }
  };

  const proccessFailedChatQuery = async () => {
    const oldChatLength = chatMessages.length
    const lastFailedQuery = chatMessages[oldChatLength - 2].text;

    setChatMessages(prev => prev.slice(0, oldChatLength - 2))
    await new Promise(r => setTimeout(r, 3000))
    await processUserChatQuery(lastFailedQuery)
  }

  return {
    isAnswering,
    chatMessages,
    processUserChatQuery,
    proccessFailedChatQuery,
  };
};
