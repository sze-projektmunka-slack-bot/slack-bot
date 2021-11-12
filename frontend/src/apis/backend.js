import axios from 'axios';

export default axios.create({
    baseURL: 'https://slack-api.oritamas.hu/api',
    headers: {
        'Accept': 'application/json'
    },
});