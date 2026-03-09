"use client";
import React from "react";
import ReactPaginate from "react-paginate";

interface ImageGalleryPaginationProps {
  items: any;
  activeIndex: number;
  slideToIndex: (index: number) => any;
}

const ImageGalleryPagination = ({
  items,
  activeIndex,
  slideToIndex,
}: ImageGalleryPaginationProps) => {
  const pageCount = items.length;

  const handlePageClick = (event: { selected: number }) => {
    slideToIndex(event.selected);
  };

  return (
    <div className="image-gallery-pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel={null}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={null}
        renderOnZeroPageCount={null}
        activeClassName="active"
        previousClassName="prev"
        nextClassName="next"
        forcePage={activeIndex}
      />
    </div>
  );
};

export default ImageGalleryPagination;
