import { useState } from "react";
import { RatingInput } from "@/components/ui/rating-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context";
import { useAddReview } from "@/hooks";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function ReviewDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  const params = useParams();
  const productId = Number(params?.id);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { mutate: createReview } = useAddReview({
    onSuccess: () => {
      toast.success("Thêm đánh giá sản phẩm thành công");
      setRating(0);
      setMessage("");
      setIsSubmitting(false);
      queryClient.invalidateQueries({
        queryKey: ["product", productId]
      })
    },
  });
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    createReview({
      data: {
        user: user?.name || "",
        rating,
        comment: message,
        productId: productId,
      }
    })

    if (onClose) {
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setRating(0);
      setMessage("");
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience and help others make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3 h-20">
            <Label className="text-sm font-medium">Your Rating</Label>
            <RatingInput value={rating} onChange={setRating} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-message" className="text-sm font-medium">
              Your Review
            </Label>
            <Textarea
              id="review-message"
              placeholder="Tell us about your experience..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="min-w-[100px]"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
