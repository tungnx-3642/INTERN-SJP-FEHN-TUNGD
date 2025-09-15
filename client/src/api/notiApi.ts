import apiClient from "./apiClient";

export interface Notification {
  id: number | string;
  title: string;
  description?: string;
  created_at: string;
  userId: number;
  orderId: number;
  read?: boolean;
}

const NotiService = {
  sendNoti: async (
    title: string,
    description: string,
    userId: number,
    orderId: number
  ) => {
    const data = {
      id: Date.now(),
      title: title,
      description: description,
      created_at: new Date().toISOString(),
      orderId: orderId,
      userId: userId,
      read: false
    };

    
    const webSokcetRequest = await fetch("/api/pusher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: `notifications-${userId}`,
        event: "new-noti",
        data: data,
      }),
    });
    if (!webSokcetRequest.ok) throw new Error("Failed to send to pusher");

    const createNotiRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/notifications`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    if (!createNotiRequest.ok) throw new Error("Failed to save to server");
  },

  getNotificationByUser: async (userId: number): Promise<Notification[]> => {
    return apiClient.get(`notifications?userId=${userId}`);
  },

  readNoti: async (notiId: number): Promise<Notification> => {
    return apiClient.patch(`notifications/${notiId}`, {
      read: true,
    });
  },
};

export default NotiService;
