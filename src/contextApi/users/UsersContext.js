import React,{createContext, useReducer} from 'react'
import { UserReducer } from './UsersReducer'
import axios from 'axios'

const initialState = {
    users:[],
    userDetails:"",
    loading:true,
    error:{}
}

export const UsersApi = createContext(initialState)


export const GlobalUser = ({children}) =>{
    const [state, dispatch] = useReducer( UserReducer , initialState)

    async function getUserData(){
        try {
         const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
            dispatch({
                type:'USER_DATA',
                payload:data
            })
        } catch (error) {
            dispatch({
                type:'USER_ERROR',
                payload:error
            })
        }
    }

    async function getUserDetails(id){
        try {
         const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
         const userPost = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)

         let newData ={
             ...data,
             userPost:userPost.data
         }
            dispatch({
                type:'USER_DETAILS',
                payload:newData
            })
        } catch (error) {
            dispatch({
                type:'USER_ERROR',
                payload:error
            })
        }
    }



    return (
       <UsersApi.Provider value={{
        getUserData,getUserDetails,
        users:state.users,
        loading:state.loading,
        userDetails:state.userDetails
       }}>
          {children}
       </UsersApi.Provider>
    )
}




