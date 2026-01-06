import api from './axois';

export const getAllCertificates = async () => {
    try {
        const response = await api.get('/certificate/All');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
}