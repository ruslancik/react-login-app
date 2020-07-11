import {userActionTypes} from './user.types'

const INITIAL_STATE = {
    CurentUser : ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.SET_CURRENT_USER:
        return{
            ...state,
            CurrentUser: action.payload
        }
        default:
            return state;
    }
}


export default userReducer;