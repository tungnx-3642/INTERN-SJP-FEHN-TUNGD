"use client";

import { Comment } from "@/api";
import { useState } from "react";
import CommentCard from "@/components/card/commentCard";
import { CustomPagination } from "@/components/CustomPagination";

function CommentLists({ comments = [] }: { comments: Comment[] }) {
  const [page, setPage] = useState(1);
  const perPage = 3;

  // Sort comments by createdAt (newest first)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const startIndex = (page - 1) * perPage;
  const currentComments = sortedComments.slice(
    startIndex,
    startIndex + perPage
  );

  return (
    <div className="mt-10">
      <h1 className="mb-5 text-xl uppercase">Bình luận ({comments.length})</h1>

      <div className="flex flex-col gap-5">
        {currentComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      <CustomPagination
        total={sortedComments.length}
        currentPage={page}
        setPage={setPage}
        itemsPerPage={perPage}
        className="lg:justify-end"
      />
    </div>
  );
}

export default CommentLists;
