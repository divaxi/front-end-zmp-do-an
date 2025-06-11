import { ChatbotControllerAskV1Data, ChatbotService } from "../api";

export const postChatbotAsk = async (
  data: ChatbotControllerAskV1Data["requestBody"]
) => {
  const res = await ChatbotService.chatbotControllerAskV1({
    requestBody: data,
  });
  return res;
};
