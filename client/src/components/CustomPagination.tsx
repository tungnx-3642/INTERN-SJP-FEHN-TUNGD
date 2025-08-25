import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  total: number;
  currentPage: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  className?: string;
}

export function CustomPagination({
  total,
  currentPage,
  setPage,
  itemsPerPage,
  className
}: CustomPaginationProps) {
  const totalPages = Math.ceil(total / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    setPage(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    setPage(Math.min(totalPages, currentPage + 1));
  };

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageNumber}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
