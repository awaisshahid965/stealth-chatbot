import React from 'react';
import rehypeRaw from 'rehype-raw';
import Markdown from 'react-markdown'

interface ChatPopupMessageProps {
  isUser: boolean;
  message: string;
}

const ChatPopupMessage: React.FC<ChatPopupMessageProps> = ({ isUser, message }) => {
  const messageClass = isUser ? 'text-gray-700 ml-auto' : 'text-gray-600';
  const messageBgClass = isUser ? 'bg-slate-100' : 'bg-slate-50';

  return (
    <div className={`flex gap-3 my-4 text-sm flex-1 px-3 py-6 rounded-lg ${messageClass} ${messageBgClass}`}>
      <div className="leading-relaxed">
        {/* <span className="block font-bold">{isUser ? 'You' : 'AI'}</span> */}
        <Markdown rehypePlugins={[rehypeRaw]}>{message}</Markdown>
      </div>
    </div>
  );
};

export default ChatPopupMessage;
