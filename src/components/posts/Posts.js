import React,{useContext, useEffect, useState} from 'react'
import { postsApi } from '../../contextApi/posts/PostContext'

export const PostsScreen = () => {
 
    const { posts , loading, getData } = useContext(postsApi)
    const [loadSize, setLoadSize] = useState(10)

    useEffect(()=>{
        getData()
    },[])

    return (
        <div className="container mt-4">
            <div className="my-2">
                 <h5>All Post List</h5>
            </div>
           {loading ? "Loading..." :<> <div className="row">
            {posts.slice(0,loadSize).map(data=> (
                <div className="col-lg-6 mt-2" key={data.id}>
                <div class="card postCard">
                <div class="card-header bg-secondary">
                  {data.title}
                </div>
                <div class="card-body">
                  {data.body}
                </div>
              </div>
              </div>
            )) }
            </div>
            <div className="mt-2">
                <butto className="btn btn-primary" onClick={()=> setLoadSize(prev=> prev+10)}>Load More</butto>
            </div> </> }
        </div>
    )
}
