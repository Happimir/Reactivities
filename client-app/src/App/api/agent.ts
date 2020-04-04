import axios, { AxiosResponse } from 'axios';
import { request } from 'http';
import IActivitiesObject from '../Models/IActivitiesObject';
import { resolve } from 'dns';

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;
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

export default {
    Activities
}