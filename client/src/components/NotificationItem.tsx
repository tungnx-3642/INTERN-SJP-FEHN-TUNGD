import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Notification } from "@/api/notiApi";
import { formatTimeToVietnamese } from "@/utlis/formatData";
import { Clock } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { useReadNoti } from "@/hooks/notiHooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context";
import { cn } from "@/lib/utils";

function NotificationItem({ noti }: { noti: Notification }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: readNoti } = useReadNoti({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", user?.id],
      });
    },
  });

  const handleNotiClick = () => {
    if (!noti.read) {
      readNoti(Number(noti.id));
    }
    router.push(routes.orders.detail(noti.orderId));
  };

  return (
    <DropdownMenuItem className="p-4" onClick={handleNotiClick}>
      <p
        className={cn({
          "font-semibold": !noti.read,
        })}
      >
        {noti.title}
      </p>
      {noti.description && (
        <p className="text-sm text-gray-500">{noti.description}</p>
      )}
      <p className="text-xs flex gap-1 items-center mt-3">
        <Clock size={12} />
        {formatTimeToVietnamese(noti.created_at)}
      </p>
    </DropdownMenuItem>
  );
}

export default NotificationItem;
