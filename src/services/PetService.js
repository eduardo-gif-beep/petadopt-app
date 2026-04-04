import api from '../models/api';

export const getPetsService = async () => {
    try {

        const response = await api.get('/pets/available');
        return response.data.map(pet => ({
            id: pet._id,
            name: pet.name,
            especie: pet.dogbreed,
            age: pet.age,
            description: pet.description,
            gender: pet.gender,
            size: pet.size,
            color: pet.color,
            imageUrl: pet.imageUrl,
            status: pet.healtStatus,
            isAvailable: pet.isAvailable
        }));
    } catch (error) {
        console.error("Error en getPetsService:", error.message);
        throw new Error("No se pudieron cargar las mascotas");
    }
};