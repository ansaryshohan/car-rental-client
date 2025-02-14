const Pagination = ({ currentPageNo, setCurrentPageNo, totalPageNumber }) => {
  const previousPage = () => {
    if (currentPageNo !== 0) {
      setCurrentPageNo((prev) => prev - 1);
    }
  };
  const nextPage = () => {
    if (currentPageNo + 1 !== totalPageNumber) {
      setCurrentPageNo((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex items-center justify-center pt-5">
      <div className="inline-flex items-center justify-center gap-3">
        <button
          onClick={previousPage}
          className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-base font-semibold text-white">
          {currentPageNo + 1}
          <span className="mx-1">/</span>
          {totalPageNumber}
        </p>

        <button
          onClick={nextPage}
          className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
