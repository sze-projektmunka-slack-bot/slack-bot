import backend from '../apis/backend';
import FormData from 'form-data';

export const login = (username, password) => {
    return async (dispatch) => {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);

        const response = await backend.post('/auth/login', data);
        dispatch({
            type: 'auth/login',
            payload: response.data
        });
    };
};

export const signup = (username, email, password, passwordConfirmation) => {
    return async (dispatch) => {
        const data = new FormData();
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('password_confirmation', passwordConfirmation);

        const response = await backend.post('/auth/register', data);

        dispatch({
            type: 'auth/signup',
            payload: response.data
        });
    };
};

export const logout = () => {
    return async (dispatch, getState) => {  
        const response = await backend.post('/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${getState().auth.token}`
            }
        });
        dispatch({
            type: 'auth/logout'
        });
    };
};