import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import useDebounce from "../../hooks/useDebounce";
import "./Table.sass";

function Table({ data: tableData, options }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: options.currentPage,
    itemsPerPage: options.itemsPerPage,
  });

  const searchValue = useDebounce(search, 2000);

  useEffect(() => {
    if (searchValue) {
      const dataCopy = tableData.filter((offer) => {
        if (searchValue) {
          return Object.values(offer)
            .toString()
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase());
        }
      });
      setData(dataCopy);
    } else {
      setData(tableData);
    }
  }, [searchValue]);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const getTableBody = () => {
    const indexOfLastTodo = pagination.currentPage * pagination.itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - pagination.itemsPerPage;
    return data.slice(indexOfFirstTodo, indexOfLastTodo);
  };

  const handleOnPageChange = (currentPage) => {
    setPagination({ ...pagination, currentPage });
  };

  const handleOnSearch = ({ target: { value } }) => setSearch(value);

  const tableBody = getTableBody();
  const totalPages = Math.round(data.length / options.itemsPerPage);

  return (
    <div className="table container">
      <input
        className="table__input"
        value={search}
        placeholder="Search in table..."
        onChange={handleOnSearch}
      />
      <table>
        <thead>
          <tr>
            {options.columns.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row) => (
            <tr>
              {options.rowKeys.map((key) => (
                <td>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={pagination.currentPage}
        paginationPagesPerSide={options.paginationPagesPerSide}
        handleOnPageChange={handleOnPageChange}
      />
    </div>
  );
}

export default Table;
