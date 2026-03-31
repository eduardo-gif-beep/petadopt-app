import { useState } from "react";
import { Alert } from "react-native";

export const useAdoptionRequest = () => {

    const [motivo, setMotivo] = useState('');

    const enviarSolicitud = (pet, navigation) => {

        if (motivo.trim() === '') {
            Alert.alert("Error", "El motivo es obligatorio");
            return;
        }

        console.log({
            petId: pet.id,
            motivo
        });

        Alert.alert("Success", "Solicitud enviada 🐶");

        setMotivo('');
        navigation.goBack();
    };

    return {
        motivo,
        setMotivo,
        enviarSolicitud
    };
};