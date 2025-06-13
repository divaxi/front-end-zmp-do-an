import React, { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const PaginationComponent: FC<PaginationProps> = ({ page, hasNextPage, onPageChange }) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <Pagination className="w-full max-w-[200px]">
        <PaginationContent className="w-full justify-center gap-2">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(page - 1)}
              className={`${page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer text-primary"} [&>span]:hidden [&>svg]:!size-8`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(page + 1)}
              className={`${!hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer text-primary"} [&>span]:hidden [&>svg]:!size-8`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
