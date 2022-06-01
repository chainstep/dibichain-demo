import axios from 'axios';
import { BACKEND_BASE_URL } from '../constants';

export const getMyProducts = async (): Promise<unknown> => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/my-products`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};

export const getMyNewProducts = async (): Promise<unknown> => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/my-new-products`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
};
