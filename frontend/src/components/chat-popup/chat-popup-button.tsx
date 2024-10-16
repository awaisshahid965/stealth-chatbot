// Button.tsx
import React from 'react';

interface ChatPopupButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ChatPopupButton: React.FC<ChatPopupButtonProps> = ({ onClick, children, disabled = false }) => {
  return (
    <button
      className={`fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium 
        disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black 
        hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 text-white`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ChatPopupButton;
