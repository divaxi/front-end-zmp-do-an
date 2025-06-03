import React from "react";
import type { Message } from "@/types";
import clsx from "clsx";

interface MessageSectionProps {
  messages: Message[];
}

export function MessageSection({ messages }: MessageSectionProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 pb-32 min-h-[60vh] bg-white">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={
            msg.sender === "user" ? "flex justify-end" : "flex justify-start"
          }
        >
          <div
            className={clsx(
              "px-4 py-2 max-w-[80%] text-lg shadow text-base rounded-t-xl",
              msg.sender === "user"
                ? "bg-primary text-white rounded-bl-xl shadow-md"
                : "bg-gray-100 text-gray-900 rounded-br-xl"
            )}
            style={{ whiteSpace: "pre-line" }}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
