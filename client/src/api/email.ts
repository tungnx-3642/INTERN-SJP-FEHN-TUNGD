import apiClient from "./apiClient";

export const sendActivateAccMail = (email: string): Promise<any> => {
  return apiClient.post("/send-mail", { to: email });
};
