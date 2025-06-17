type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const changePage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={index} className="px-4 py-2 text-[#ffe6c7]">
            ...
          </span>
        );
      }

      const pageNum = page as number;

      return (
        <button
          key={index}
          onClick={() => changePage(pageNum)}
          className={`rounded-lg px-4 py-2 ${
            currentPage === pageNum
              ? "bg-[#ff6200] text-[#ffe6c7]"
              : "border border-[#a84c00]/30 bg-[#454545] text-[#ffe6c7]/60 hover:text-[#ffe6c7]"
          }`}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded-lg border border-[#a84c00]/30 bg-[#454545] p-2 ${
            currentPage === 1
              ? "text-[#555]"
              : "text-[#ffe6c7]/60 hover:text-[#ffe6c7]"
          }`}
        >
          {/* Left arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`rounded-lg border border-[#a84c00]/30 bg-[#454545] p-2 ${
            currentPage === totalPages
              ? "text-[#555]"
              : "text-[#ffe6c7]/60 hover:text-[#ffe6c7]"
          }`}
        >
          {/* Right arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
