import React, { useState, useEffect } from "react";
import { getPostDetails,deletePostDetails } from "./actions";
import { useHistory } from 'react-router-dom'

export const ProfileScreen = () => {
    const history = useHistory()
  const [profilesPost, setProfilesPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostDetails(setProfilesPost, setLoading);
    // return () => {
    //     cleanup
    // }
  }, []);

  return (
    <div className="container mt-4">
      <div className="userPostHeader">
        <h5> User 2 All Posts</h5>
        <button className="btn btn-primary"
        onClick={() => history.push(`/Profile/create`)}
        >Add Post</button>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          {" "}
          <div className="row">
            {profilesPost?.map((data) => (
              <div className="col-lg-6 mt-2" key={data.id}>
                <div class="card">
                  <div class="card-header bg-secondary">{data.title}</div>
                  <div class="card-body">
                    <p>{data.body}</p>
                    <div>
                      <button className="btn btn-danger me-2"
                      onClick={() => deletePostDetails(data.id,profilesPost,setProfilesPost )}
                      >Delete</button>
                      <button className="btn btn-primary me-2"
                      onClick={() => history.push(`/Profile/edit/${data.id}`)}
                      >Update</button>
                      <button className="btn btn-primary"
                      onClick={() => history.push(`/Profile/view/${data.id}`)}
                      >Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
        </>
      )}
    </div>
  );
};
