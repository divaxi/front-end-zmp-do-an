import { chatbotMessageList } from "@/state";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { MessageSection } from "@/components/chatbot/message-section";
import { InputMessage } from "@/components/chatbot/input-message";
import { postChatbotAsk } from "@/client/services/chatbot";
import { useSnackbar } from "zmp-ui";

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useAtom(chatbotMessageList);
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [firstMount, setFirstMount] = useState(true);
  useEffect(() => {
    setFirstMount(false);
  });
  return (
    <div className="relative bg-white">
      <MessageSection messages={messages} loading={loading} />
      <InputMessage
        loading={loading}
        onSend={(msg) => {
          setMessages((prev) => [...prev, msg]);
          setLoading(true);
          postChatbotAsk({ content: [...messages, msg], initiate: firstMount })
            .then((data) => {
              setMessages((prev) => [
                ...prev,
                { content: data.content, role: "assistant" },
              ]);
              setLoading(false);
            })
            .catch(() => {
              openSnackbar({
                text: "Có lỗi xảy ra",
                type: "error",
              });
              setLoading(false);
            });
        }}
      />
    </div>
  );
};

export default ChatbotPage;
