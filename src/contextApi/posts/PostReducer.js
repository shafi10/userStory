export const postReducer =  (state, action) =>{
    let {type, payload } = action

    switch(type){
        case 'GET_DATA':
            return {
                ...state,
                posts:payload,
                loading:false
            }
        case 'DATA_ERROR':
            return {
                ...state,
                error:payload,
                loading:false
            }               
            default:
            return state 
    }

}