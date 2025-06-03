import React, { useState, useRef } from "react";
import type { Message } from "@/types";
import { SendHorizonalIcon } from "lucide-react";

interface InputMessageProps {
  onSend: (msg: Message) => void;
}

export function InputMessage({ onSend }: InputMessageProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSend() {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    };
    onSend(userMsg);
    setInput("");
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Cảm ơn anh/chị đã nhắn tin! Em sẽ hỗ trợ anh/chị trong thời gian sớm nhất.",
        sender: "bot",
      };
      onSend(botMsg);
    }, 500);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex items-center px-4 py-3 z-10">
      <input
        ref={inputRef}
        type="text"
        className="flex-1 rounded-full border border-gray-200 px-4 py-2 mr-2
        focus:outline-none focus:ring-2 focus:ring-primary text-base bg-gray-50"
        placeholder="Hãy hỏi điều gì đó đi"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Nhập tin nhắn"
      />
      <button
        className="bg-primary text-white rounded-full px-4 py-2 font-medium hover:bg-iconBorder transition"
        onClick={handleSend}
        aria-label="Gửi tin nhắn"
      >
        <SendHorizonalIcon />
      </button>
    </div>
  );
}
