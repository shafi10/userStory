import React, { useEffect, useContext,useState, useMemo } from "react";
import { UsersApi } from "../../contextApi/users/UsersContext";
import { useParams } from "react-router-dom";
import UserDetailsPagination from '../../components/layout/UsersDetailsPagination'

export const UserDetails = () => {
  const { userDetails, getUserDetails, loading } = useContext(UsersApi);

  //Table Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(3);

  const { id } = useParams();
  useEffect(() => {
    getUserDetails(id);
    return () => getUserDetails(0);
 
  }, [id]);

  let tableData = useMemo(() => {
     if(userDetails){
         let computedData = userDetails?.userPost;
         //Pagination
         const indexOfLastPost = currentPage * userPerPage;
         const indexOfFirstPost = indexOfLastPost - userPerPage;
         computedData = computedData.slice(indexOfFirstPost, indexOfLastPost);
         return computedData;
     }
  }, [userDetails, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      {loading ? (
        "loading..."
      ) : (
        <div className="row">
          <div className="col-lg-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">User Information</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  Name: {userDetails?.name}
                </h6>
                <p class="card-text">Email: {userDetails?.email}</p>
                <p class="card-text">Address: {userDetails?.address?.city}</p>
                <p class="card-text">
                  Company:
                  <ul>
                    <li>{userDetails?.company?.name}</li>
                  </ul>
                </p>
                <a href={userDetails?.website} class="card-link">
                  Website
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div>
                <h5>{userDetails.name} Posts</h5>
              </div>
              {tableData?.map((data) => (
                <div className="col-lg-12 my-2">
                  {" "}
                  <div class="card">
                    <h5 class="card-header">{data.title}</h5>
                    <div class="card-body">
                      <p class="card-text">{data.body}</p>
                    </div>
                  </div>{" "}
                </div>
              ))}
              <div className="page">
                <UserDetailsPagination
                  PerPage={userPerPage}
                  total={userDetails?.userPost?.length}
                  paginate={paginate}
                  id={id}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
