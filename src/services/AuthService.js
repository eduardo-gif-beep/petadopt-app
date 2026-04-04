import StorageService from '../helpers/StorageService';
import api from '../models/api';

export const getUserProfile = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch (error) {
        throw new Error("No se pudo obtener el perfil");
    }
};

export const loginService = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });

        const { token } = response.data;

        console.log(token);
        
        if (token) {
            await StorageService.saveToken('userToken', token);
            return { success: true, token};
        }
        
    } catch (error) {
    throw new Error(error.response?.data?.msg || error.message || "Error desconocido");
}
};

export const registerService = async (userData) => {
    try {
        const dataForBackend = {
            name: userData.name,
            lastName: userData.lastName,
            age: parseInt(userData.age),
            income: parseFloat(userData.income),
            email: userData.email,
            password: userData.password,
            haveyard: userData.tienePatio,
            isAdmin: userData.isAdmin || false
        };

        const response = await api.post('/auth/register', dataForBackend);

        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.msg || "Error en el registro");
    }
};