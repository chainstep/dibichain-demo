import axios from 'axios';
import { BACKEND_BASE_URL } from '../../constants';

export const postMyProductDetailsRequest = async (uid: string): Promise<void> => {

    const data = {
        uid
    };

    try {
        await axios.post(`${BACKEND_BASE_URL}/my-product-details-requests`, data);
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

export const getMyProductDetailsRequest = async (): Promise<unknown> => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/my-product-details-requests`);
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

export const getProductDetailsRequest = async (): Promise<unknown> => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/product-details-requests`);
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

export const postMyProductDetailsResponse = async (uid: string, publicKey: string, decline?: boolean): Promise<void> => {

    const data = {
        uid,
        publicKey,
        decline
    };

    try {
        await axios.post(`${BACKEND_BASE_URL}/my-product-details-responses`, data);
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