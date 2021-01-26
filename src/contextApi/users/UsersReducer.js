export const UserReducer =  (state, action) =>{
    let {type, payload } = action

    switch(type){
        case 'USER_DATA':
            return {
                ...state,
                users:payload,
                loading:false
            }
        case 'USER_DETAILS':
                return {
                    ...state,
                    userDetails:payload,
                    loading:false
                }
        case 'USER_ERROR':
            return {
                ...state,
                error:payload,
                loading:false
            }               
            default:
            return state 
    }

}