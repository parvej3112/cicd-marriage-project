import api from './axois';

export const login = async (email, password) => {
  try {
    const response = await api.post('/admin/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export const logout = async () =>{
    return await api.post('/admin/logout');
}
