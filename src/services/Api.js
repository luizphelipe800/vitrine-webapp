import Axios from 'axios';
import { getToken } from './Auth';

const Api = Axios.create({
    baseURL: 'http://localhost:3000'
});

Api.interceptors.request.use(async config => {
    try{
        const item = getToken();

        if(item !== null){
            config.headers.Authorization = `Bearer ${item.token}`;
        }

        return config;
    }catch(err){
        console.log(err);
    }
});

export default Api;