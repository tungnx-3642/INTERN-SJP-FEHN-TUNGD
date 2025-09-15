import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { Notification } from "@/api";
import NotiService from "@/api/notiApi";

export const useNotifications = (
  userId: number | undefined,
  options?: Omit<UseQueryOptions<Notification[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: () => NotiService.getNotificationByUser(userId!),
    enabled: !!userId,
    ...options,
  });
};

export const useReadNoti = (
  options?: UseMutationOptions<Notification, Error, number>
) => {
  return useMutation<Notification, Error, number>({
    mutationFn: (notiId: number) => NotiService.readNoti(notiId),
    ...options,
  });
};
