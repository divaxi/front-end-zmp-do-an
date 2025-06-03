import { chatbotMessageList } from "@/state";
import { useAtom } from "jotai";
import React from "react";
import { MessageSection } from "@/components/chatbot/message-section";
import { InputMessage } from "@/components/chatbot/input-message";

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useAtom(chatbotMessageList);
  return (
    <div className="relative bg-white">
      <MessageSection messages={messages} />
      <InputMessage onSend={(msg) => setMessages((prev) => [...prev, msg])} />
    </div>
  );
};

export default ChatbotPage;
