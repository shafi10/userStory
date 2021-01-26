import React,{createContext, useReducer} from 'react'
import { postReducer } from './PostReducer'
import axios from 'axios'

const initialState = {
    posts:[],
    loading:true,
    error:{}
}

export const postsApi = createContext(initialState)


export const GlobalPosts = ({children}) =>{
    const [state, dispatch] = useReducer( postReducer , initialState)

    async function getData(){
        try {
         const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
            dispatch({
                type:'GET_DATA',
                payload:data
            })
        } catch (error) {
            dispatch({
                type:'DATA_ERROR',
                payload:error
            })
        }
    }


    return (
       <postsApi.Provider value={{
        getData,
        posts:state.posts,
        loading:state.loading
       }}>
          {children}
       </postsApi.Provider>
    )
}




