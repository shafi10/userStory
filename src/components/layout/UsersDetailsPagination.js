import React from "react";
import { Link } from "react-router-dom";

const UserDetailsPagination = ({ PerPage, total, paginate,id }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / PerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {pageNumbers.map((number) => (
          <li key={number} class="page-item">
            <Link
              class="page-link"
              onClick={() => paginate(number)}
              to={`/Users/details/${id}`}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserDetailsPagination;
