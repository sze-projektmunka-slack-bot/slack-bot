import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

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
        case 'auth/getLocalToken': {
            if(action.payload) {
                return {
                    ...state,
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