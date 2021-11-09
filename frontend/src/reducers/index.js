import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

const defaultAuthState = {
    isLoggedIn: false,
    token: ''
};

const authReducer = (state = defaultAuthState, action) => {
    switch(action.type) {
        case 'auth/login':
            return {
                ...state, 
                isLoggedIn: true,
                token: action.payload.token
            };
        case 'auth/signup':
            return state;
        case 'auth/logout': 
            return {
                ...state,
                isLoggedIn: false,
                token: ''
            };
        case 'auth/getLocalToken': {
            if(action.payload) {
                return {
                    ...state,
                    isLoggedIn: true,
                    token: action.payload
                };
            } else {
                return state;
            }
        };            
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    form: formReducer
});