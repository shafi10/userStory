import React,{useState,useEffect} from 'react'
import { getSinglePostDetails } from './actions'
import { useParams } from "react-router-dom";

export const PostDetails = () => {
    const {id} = useParams()
    const [postDetails,setPostDetails] = useState("")
     
    useEffect(()=>{
        getSinglePostDetails(id,setPostDetails)
        return () =>{
            setPostDetails("")
        }
    },[id])

    return (
        <div className="container mt-4">
            <div className="row">
               <div className="col-lg-4">
               <div class="card">
              <div class="card-body">
                <h5 class="card-title mb-2">Post Information</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  Title: {postDetails?.title}
                </h6>
                <p class="card-text">Body: {postDetails?.body}</p>               
              </div>
            </div>
               </div> 
               <div className="col-lg-8">
               <div className="row">
              <div>
                <h5>Comments</h5>
              </div>
              {postDetails?.comments?.map((data) => (
                <div className="col-lg-12 my-2">
                  {" "}
                  <div class="card">
                    <h5 class="card-header">Name: {data?.name}</h5>
                    <div class="card-body">
                    <p class="card-text">Email: {data?.email}</p>
                      <p class="card-text">Body: {data?.body}</p>
                    </div>
                  </div>{" "}
                </div>
              ))}
            </div>
               </div>
            </div>
        </div>
    )
}
