import backend from '../apis/backend';
import FormData from 'form-data';

export const login = (username, password) => {
    return async (dispatch) => {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);

        let error;
        const response = await backend.post('/auth/login', data).catch((err) => {
            error = err;
            console.log(err);
        });

        if(response) {
            localStorage.setItem('token', response.data.token);
            return dispatch({
                type: 'auth/login',
                payload: response.data
            });
        } else {
            return dispatch({
                type: 'auth/login/ERROR',
                payload: error
            });
        }
    };
};

export const signup = (username, email, password, passwordConfirmation) => {
    return async (dispatch) => {
        const data = new FormData();
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('password_confirmation', passwordConfirmation);

        let error;
        const response = await backend.post('/auth/register', data).catch((err) => {
            error = err;
        });

        if(response) {
            return dispatch({
                type: 'auth/signup',
                payload: response.data
            });
        } else {
            return dispatch({
                type: 'auth/signup/ERROR',
                payload: error
            });
        }
        
    };
};

export const logout = () => {
    return async (dispatch, getState) => {  
        const response = await backend.post('/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${getState().auth.token}`
            }
        }).then(res => {
            localStorage.removeItem('token');
        }).catch();
        dispatch({
            type: 'auth/logout'
        });
    };
};

export const getLocalToken = () => {
    return {
        type: 'auth/getLocalToken',
        payload: localStorage.getItem('token')
    };
};