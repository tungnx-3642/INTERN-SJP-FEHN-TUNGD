import { Review } from "@/api";
import { StarRating } from "@/app/[locale]/(user)/products/[id]/_components/ReviewSection";
import { formatTimeToVietnamese } from "@/utlis/formatData";
import Image from "next/image";
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 p-4">
        <Image
          src="/client/client-1.jpg"
          alt="Avatar"
          width={50}
          height={50}
          className="rounded-full h-12 w-12 object-cover"
        />
        <div>
          <h3>{review.user}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <StarRating rating={review.rating} size={16} />
            <span>{formatTimeToVietnamese(review.created_at)}</span>
          </div>
        </div>
      </div>
      <p>{review.comment}</p>
    </div>
  );
}

export default ReviewCard;
