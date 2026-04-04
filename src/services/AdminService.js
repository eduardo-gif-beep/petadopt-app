import api from '../models/api';

export const getAllRequests = async () => {
    const response = await api.get('/adoptions/admin/all');
    return response.data;
};

export const updateRequestStatus = async (id, status) => {
    const response = await api.patch(`/adoptions/admin/status/${id}`, { status });
    return response.data;
};

export const registerPet = async (petData) => {
    try {
        const response = await api.post('/pets/admin/register', petData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.msg || "Error al registrar mascota");
    }
};