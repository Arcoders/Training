import React from "react";
import "./Pagination.sass";

function Pagination({
  totalPages,
  handleOnPageChange,
  currentPage,
  paginationPagesPerSide,
}) {
  const getPaginationNumbers = () => {
    const { nextPages, prevPages } = getPagesPerSide();
    let numbers = [];
    for (let number = prevPages; number <= nextPages; number++) {
      numbers.push(number);
    }
    return numbers;
  };

  const getPagesPerSide = () => {
    let prevPages = currentPage - paginationPagesPerSide;
    let nextPages = currentPage + paginationPagesPerSide;
    if (prevPages <= 0) prevPages = 1;
    if (nextPages > totalPages) nextPages = totalPages;
    return { nextPages, prevPages };
  };

  const handleGoToPage = ({ target: { value } }) =>
    !!parseInt(value) && handleOnPageChange(parseInt(value));
  const nextPage = () =>
    currentPage < totalPages && handleOnPageChange(currentPage + 1);
  const prevPage = () => currentPage > 1 && handleOnPageChange(currentPage - 1);
  const getItemClassName = (number) =>
    `pagination__item ${
      number === currentPage ? "pagination__item--active" : ""
    }`;

  const currentNumbers = getPaginationNumbers();

  return (
    <ul className="pagination">
      <span>Total pages: {totalPages}</span>
      <input
        min="1"
        className="pagination__input"
        type="number"
        placeholder="Go to"
        onChange={handleGoToPage}
      />
      <li className="pagination__item" onClick={prevPage}>
        &lsaquo;
      </li>
      {currentNumbers.map((number) => (
        <li
          key={number}
          className={getItemClassName(number)}
          onClick={() => {
            handleOnPageChange(number);
          }}
        >
          {number}
        </li>
      ))}
      <li className="pagination__item" onClick={nextPage}>
        &rsaquo;
      </li>
    </ul>
  );
}

export default Pagination;
