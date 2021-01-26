import React, { useEffect, useContext, useMemo, useState } from "react";
import { UsersApi } from "../../contextApi/users/UsersContext";
import UserPagination from "../layout/UsersPagination";
import { useHistory } from 'react-router-dom'

export const UsersScreen = () => {
  const { getUserData, users, loading } = useContext(UsersApi);
  const history = useHistory()
  //Search
  const [search, setSearch] = useState("");
  const [searchBtn, setSearchBtn] = useState("");

  //Table Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(3);

  // Sorting Table
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
    setSorting({ field, order });
  };

  useEffect(() => {
    getUserData();
  }, []);


  let tableData = useMemo(() => {
    let computedData = users;

    //Pagination

    const indexOfLastPost = currentPage * userPerPage;
    const indexOfFirstPost = indexOfLastPost - userPerPage;
    computedData = computedData.slice(indexOfFirstPost, indexOfLastPost);

    //Search Option
    if (search) {
      computedData = computedData.filter((data) => {
        if (search.includes("@")) {
          return data.email.toLowerCase().includes(search.toLowerCase());
        } else if (search.includes(".")) {
          return data.website.toLowerCase().includes(search.toLowerCase());
        } else {
          return data.name.toLowerCase().includes(search.toLowerCase());
        }
      });
    }

    //Sorting

    if (sorting.field) {
      let reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return computedData;
  }, [users, currentPage, userPerPage, sorting, searchBtn]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div>
        <h1>All Users</h1>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search...."
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => setSearchBtn(search) }
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    { loading ? "Loading..." :  <div className="row">
        <div className="col-lg-12">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" onClick={() => onSortingChange("name")}>
                  Name{" "}
                  {sortingField && sortingField === "name" && (
                    <i
                      className={
                        sortingOrder === "asc"
                          ? "fas fa-caret-down"
                          : "fas fa-caret-up"
                      }
                    ></i>
                  )}
                </th>
                <th scope="col" onClick={() => onSortingChange("email")}>
                  Email{" "}
                  {sortingField && sortingField === "email" && (
                    <i
                      className={
                        sortingOrder === "asc"
                          ? "fas fa-caret-down"
                          : "fas fa-caret-up"
                      }
                    ></i>
                  )}
                </th>
                <th scope="col">Website</th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((data) => (
                  <tr key={data.id}>
                    <td><span
                    onClick={()=>{
                        history.push(`/Users/details/${data.id}`)
                    }}
                    >{data.name}</span></td>
                    <td>{data.email}</td>
                    <td>{data.website}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col-lg-1">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setUserPerPage(e.target.value)}
                value={userPerPage}
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={users.length}>ALL</option>
              </select>
            </div>
            <div className="col-lg-11">
              <div className="page">
                <UserPagination
                  PerPage={userPerPage}
                  total={searchBtn.length > 0 ? tableData.length : users.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div> }
    </div>
  );
};
