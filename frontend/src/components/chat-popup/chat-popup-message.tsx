import React from "react";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import { IChatMessage } from "../../types/chat.types";

interface ChatPopupMessageProps extends IChatMessage {
  onFail: () => void;
}

const ChatPopupMessage: React.FC<ChatPopupMessageProps> = ({
  isUser,
  text,
  failedProcessing = false,
  onFail,
}) => {
  const messageClasses = isUser ? "text-gray-700 ml-auto" : "text-gray-600";
  const messageBgClasses = isUser ? "bg-slate-100" : "bg-slate-50";
  const errorClasses = failedProcessing ? "!py-3 !bg-transparent" : "";

  const renderMessage = () => {
    if (failedProcessing) {
      return (
        <>
          <span>{text},&nbsp;</span>
          <button className="cursor-pointer underline " onClick={onFail}>retry...</button>
        </>
      );
    }

    return (
      <Markdown rehypePlugins={[rehypeRaw]}>{text}</Markdown>
    );
  };

  return (
    <div
      className={`flex gap-3 my-4 text-sm flex-1 px-3 py-6 rounded-lg ${messageClasses} ${messageBgClasses} ${errorClasses}`}
    >
      <div className="leading-relaxed">
        {/* <span className="block font-bold">{isUser ? 'You' : 'AI'}</span> */}
        {renderMessage()}
      </div>
    </div>
  );
};

export default ChatPopupMessage;
