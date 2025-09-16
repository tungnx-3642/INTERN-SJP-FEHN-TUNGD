"use client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import ReviewDialog from "@/components/dialog/reviewDialog";
import { Review } from "@/api";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";

export function StarRating({
  rating,
  size = 24,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex relative w-max">
      {Array.from({ length: 5 }).map((_, index) =>
        index < Math.floor(rating) ? (
          <Star
            key={index}
            size={size}
            className="text-yellow-400"
            fill="#fdc700"
          />
        ) : (
          <Star key={index} size={size} className="text-gray-300" />
        )
      )}
    </div>
  );
}

function ReviewSection({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("ReviewSection");
  const router = useRouter();
  const { user } = useAuth();
  const [openReivewDialog, setOpenReviewDialog] = useState(false);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }, [reviews]);

  const handleAddReview = () => {
    if (user) {
      setOpenReviewDialog(true);
    } else {
      toast.error(t("loginToReview"));
      router.push(routes.auth.login);
    }
  };

  return (
    <div className="border-y py-4 flex gap-2 text-gray-500 text-sm items-center">
      <StarRating rating={averageRating} />

      {reviews.length ? (
        <>
          <span>
            {reviews.length} {reviews.length === 1 ? t("review") : t("reviews")}
          </span>
          <span className="text-gray-300">|</span>
        </>
      ) : (
        <span>{t("noReviews")}</span>
      )}

      <Button
        variant="link"
        onClick={handleAddReview}
        className="text-gray-500"
      >
        {t("addReview")}
      </Button>
      <ReviewDialog
        isOpen={openReivewDialog}
        onClose={() => setOpenReviewDialog(false)}
      />
    </div>
  );
}

export default ReviewSection;
