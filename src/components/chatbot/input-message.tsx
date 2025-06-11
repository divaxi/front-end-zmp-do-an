import React, { useState, useRef } from "react";
import { SendHorizonalIcon } from "lucide-react";
import { MessageContentDto } from "@/client/api";

interface InputMessageProps {
  onSend: (msg: MessageContentDto) => void;
  loading: boolean;
}

export function InputMessage({ onSend, loading }: InputMessageProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSend() {
    if (!input.trim()) return;
    const userMsg: MessageContentDto = {
      content: input,
      role: "user",
    };
    onSend(userMsg);
    setInput("");
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
        disabled={loading}
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
