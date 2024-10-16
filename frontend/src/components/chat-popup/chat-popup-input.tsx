import React, { useState } from "react";
import SendIcon from "../../icons/send-icon";

interface ChatPopupInputBoxProps {
  disableButton?: boolean;
  onSend: (message: string) => void;
}

const ChatPopupInputBox: React.FC<ChatPopupInputBoxProps> = ({
  disableButton,
  onSend,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex items-center pt-0">
      <form
        className="flex items-center justify-center w-full space-x-2 relative"
        onSubmit={handleSubmit}
      >
        <input
          className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280]
            outline-none disabled:cursor-not-allowed
            disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
          placeholder="Type your message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          disabled={disableButton}
          className="inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-50 px-2 py-2 absolute right-0 top-0"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatPopupInputBox;
