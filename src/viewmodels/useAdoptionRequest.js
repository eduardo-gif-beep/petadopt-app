import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";

export const useAdoptionRequest = () => {
    const [motivo, setMotivo] = useState('');
    const [ingresos, setIngresos] = useState('');
    const [tienePatio, setTienePatio] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const enviarSolicitud = async (pet, navigation) => {
        if (motivo.trim() === '' || ingresos.trim() === '') {
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        setIsSubmitting(true);

        try {
            const userData = await StorageService.getItem('userData');
            const userId = userData ? userData.id : "guest_001";

            const solicitud = {
                userId,
                petId: pet.id,
                motivo,
                ingresos: parseFloat(ingresos),
                tienePatio
            };

            console.log("Enviando Solicitud Mock:", solicitud);

            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert("¡Éxito!", `Tu solicitud para adoptar a ${pet.name} ha sido enviada al refugio.`);
            
            setMotivo('');
            setIngresos('');
            setTienePatio(false);
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "No se pudo enviar la solicitud.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        motivo, setMotivo,
        ingresos, setIngresos,
        tienePatio, setTienePatio,
        isSubmitting,
        enviarSolicitud
    };
};