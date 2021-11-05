import { combineReducers } from "redux";

const defaultAuthState = {
    token: ''
};

const authReducer = (state = defaultAuthState, action) => {
    switch(action.type) {
        case 'auth/login':
            return {
                ...state, 
                token: action.payload.token
            };
        case 'auth/signup':
            return state;
        case 'auth/logout': 
            return {
                ...state,
                token: ''
            };
        default:
            return state;
    }
};

export default combineReducers({auth: authReducer});