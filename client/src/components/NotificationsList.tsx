"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import NotiService, { Notification } from "@/api/notiApi";
import NotificationItem from "./NotificationItem";
import { useAuth } from "@/context";
import apiClient from "@/api/apiClient";
import { useNotifications } from "@/hooks/notiHooks";

export function NotificationsList() {
  const { user } = useAuth();
  const { data: fetchNotifications } = useNotifications(user?.id);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const haveNewNoti = notifications.some((noti) => !noti.read);

  useEffect(() => {
    var pusher = new Pusher("6117395af89fa27fd771", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe(`notifications-${user?.id}`);

    channel.bind("new-noti", (noti: Notification) => {
      setNotifications((pre) => [...pre, noti]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (fetchNotifications) {
      setNotifications(fetchNotifications);
    }
  }, [fetchNotifications]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="w-6 h-6 text-gray-700" />
        {haveNewNoti && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80" align="start">
        <div className="px-3 py-2 border-b">
          <p className="font-medium">
            Thông báo ({notifications.length})
          </p>
        </div>
        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-gray-500 cursor-default">
            Không có thông báo
          </DropdownMenuItem>
        ) : (
          <ScrollArea className="h-72">
            {notifications.map((n) => (
              <NotificationItem noti={n} key={n.id} />
            ))}
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
