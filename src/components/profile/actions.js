import axios from 'axios'
import { toast } from 'react-toastify';


export const getPostDetails = async (setProfilesPost,setLoading) => {
    setLoading(true)
    try {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=2`)
        if(res.status === 200 && res.data){
               setProfilesPost(res.data) 
               setLoading(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

export const deletePostDetails = async (id,profilesPost,setProfilesPost) => {
    try {
        let res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if(res.status === 200 && res.data){
               let filterData = profilesPost.filter(data => data.id !== id)
               setProfilesPost(filterData) 
        }
    } catch (error) {
        console.log(error)
    }
}


export const getSinglePost = async (id , setSingledata) => {
    try {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if(res.status === 200 && res.data){
            setSingledata(res.data) 
        }
    } catch (error) {
        console.log(error)
    }
}

export const SavePost = async (payload,cb) => {
    try {
        let res = await axios.post(`https://jsonplaceholder.typicode.com/posts`,payload)
        if(res.status === 201 ){
            cb()
            toast.success(res?.message || "Submitted successfully");
        }
    } catch (error) {
        console.log(error)
    }
}


export const EditPost = async (id ,payload) => {
    try {
        let res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,payload)
        if(res.status === 200){
            toast.success("Edit successful")
        }
    } catch (error) {
        console.log(error)
    }
}


export const getSinglePostDetails = async (id , setSingledata) => {
    try {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        let response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        if(res.status === 200 && res.data){
            let newData ={
                ...res.data,
                comments:response.data
            }
            setSingledata(newData) 
        }
    } catch (error) {
        console.log(error)
    }
}





