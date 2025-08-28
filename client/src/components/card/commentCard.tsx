import { Comment } from "@/api";
import { formatTimeToVietnamese } from "@/utlis/formatData";

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="text-gray-600">
      <div className="flex gap-2 bg-gray-100 p-4 italic">
        <span className="border-r-2 pr-6 border-gray-600">Đăng bởi {comment.name}</span>
        <span>{formatTimeToVietnamese(comment.createdAt)}</span>
      </div>
      <p className="p-4">{comment.message}</p>
    </div>
  );
}

export default CommentCard;
