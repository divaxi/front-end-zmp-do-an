import React from "react";
import clsx from "clsx";
import { MessageContentDto } from "@/client/api";

interface MessageSectionProps {
  messages: MessageContentDto[];
  loading: boolean;
}

export function MessageSection({ messages, loading }: MessageSectionProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 pb-32 min-h-[60vh] bg-white">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={
            msg.role === "user" ? "flex justify-end" : "flex justify-start"
          }
        >
          <div
            className={clsx(
              "px-4 py-2 max-w-[80%] text-lg shadow text-base rounded-t-xl",
              msg.role === "user"
                ? "bg-primary text-white rounded-bl-xl shadow-md"
                : "bg-gray-100 text-gray-900 rounded-br-xl"
            )}
            style={{ whiteSpace: "pre-line" }}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-t-xl rounded-br-xl">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
