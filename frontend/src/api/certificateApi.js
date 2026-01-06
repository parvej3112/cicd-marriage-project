import api from "./axois";

export const createCertificate = async (certificateData) => {
  try {
    const response = await api.post('/certificate/createCertificate', certificateData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export const getAllCertificates = async () => {
  try {
    const response = await api.get('/certificate/All');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export const getCertificateById = async (id) => {
  try {
    const response = await api.get(`/certificate/fetch/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}


export const updateCertificateById = async (id, certificateData) => {
  try {
    const response = await api.put(`/certificate/update/${id}`, certificateData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export const deleteCertificateById = async (id) => {
  try {
    const response = await api.delete(`/certificate/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}
