import axios from 'axios';
import { BACKEND_BASE_URL } from '../../constants';
import { Document } from '../../types';

export const getMyDocuments = async (uid: string): Promise<unknown> => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/my-documents/?uid=${uid}`);
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

export const getDocuments = async (uid: string): Promise<unknown> => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/documents/?uid=${uid}`);
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

export const postMyDocuments = async (myDocuments: Document[]): Promise<unknown> => {
    const data = {
        myDocuments
    };

    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/my-documents`, data);
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