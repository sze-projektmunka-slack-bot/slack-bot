import backend from '../apis/backend';
import FormData from 'form-data';

export const login = (username, password) => {
    return async (dispatch) => {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);

        await fetch('https://slack-api.oritamas.hu/sanctum/csrf-cookie', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => console.log(response))
        .then(result => console.log(result))
        .then(err => console.log(err));

        await fetch('https://slack-api.oritamas.hu/api/auth/login', {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => console.log(response))
        .then(result => console.log(result))
        .then(err => console.log(err));



        /*console.log(response.data);
        dispatch({
            type: 'auth/login',
            response
        });*/
    };
};

export const signup = (username, email, password, passwordConfirmation) => {
    return async (dispatch) => {
        const data = new FormData();
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('password_confirmation', passwordConfirmation);
    
        const config = {
            method: 'post',
            url: '/auth/register',
            data
        };
    
        const response = await backend(config);
        console.log(response);
        dispatch({
            type: 'auth/signup',
            payload: response
        });
    };
};

export const logout = () => {
    return async (dispatch) => {    
        const config = {
            method: 'post',
            url: '/auth/logout'
        };
    
        const response = await backend(config);
        console.log(response);
        dispatch({
            type: 'auth/logout',
            payload: response
        });
    };
};