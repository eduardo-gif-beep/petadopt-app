import { useState } from "react";
import { Alert } from "react-native";

export const useRegisterPet = () => {
    const [name, setName] = useState('');
    const [especie, setEspecie] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterPet = async (navigation) => {
        // Validaciones básicas según el contrato
        if (!name || !especie || !age || !description) {
            Alert.alert("Error", "Todos los campos son obligatorios para el registro.");
            return;
        }

        setIsLoading(true);

        try {
            const newPet = {
                id: `pet_${Date.now()}`,
                name,
                especie,
                age,
                description
            };

            console.log("Mascota registrada con éxito:", newPet);

            await new Promise(resolve => setTimeout(resolve, 1000));

            Alert.alert("Éxito", "La mascota ha sido añadida al catálogo.");

            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "No se pudo registrar la mascota.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        name, setName,
        especie, setEspecie,
        age, setAge,
        description, setDescription,
        isLoading,
        handleRegisterPet
    };
};