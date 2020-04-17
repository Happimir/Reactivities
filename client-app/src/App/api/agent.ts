import axios, { AxiosResponse } from 'axios';
import IActivitiesObject from '../Models/IActivitiesObject';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../Models/User';

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
    if(error.message === "Network Error" && !error.response) {
        toast.error("Network Error - Server Down");
    }

    const {status, data, config} = error.response;
    
    if(status === 404) {
        history.push("/notfound");
    }

    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push("/notfound");
    }
    if(status === 500) {
        toast.error("Server Error - Check terminal for more info!");
    }
    
    throw error.response;
}) 

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

const responseBody = (response: AxiosResponse ) => response.data;
const sleep = (ms : number) => (response: AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get : (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post : (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put : (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Activities = {
    list: () : Promise<IActivitiesObject[]> => requests.get('/activities/list') ,
    details: (id: string) => requests.get(`/activities/detail/${id}`),
    create: (activity : IActivitiesObject) => requests.post("/activities/create", activity),
    update: (activity: IActivitiesObject) => requests.put(`/activities/update/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/delete/${id}`)
};

const User = {
    current: () : Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues) : Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues) : Promise<IUser> => requests.post(`/user/register`, user)
}

export default {
    Activities,
    User
}