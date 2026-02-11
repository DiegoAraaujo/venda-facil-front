import ReactPaginate from "react-paginate";
import React from "react";

interface PaginationProps {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ total, page, setPage }: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);
  };

  return (
    <div className="flex justify-center">
      <ReactPaginate
        previousLabel={<i className="bi bi-chevron-left text-xl" />}
        nextLabel={<i className="bi bi-chevron-right text-xl" />}
        pageCount={total}
        forcePage={page}
        onPageChange={handlePageClick}
        containerClassName="flex gap-2"
        pageClassName="rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
        pageLinkClassName="block px-3 py-1 w-full h-full cursor-pointer"
        activeLinkClassName="border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-200"
        previousClassName=" hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 rounded-lg cursor-pointer"
        nextClassName=" hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 rounded-lg cursor-pointer"
        previousLinkClassName="block px-3 py-1"
        nextLinkClassName="block px-3 py-1"
        disabledClassName="opacity-40 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
