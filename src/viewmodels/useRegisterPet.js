import { useState } from "react";
import { Alert } from "react-native";
import { registerPet } from "../services/AdminService";

export const useAdminPet = (navigation) => {
    const [form, setForm] = useState({
        name: '',
        dogbreed: '',
        age: '',
        gender: 'Macho',
        size: 'Grande',
        color: '',
        description: '',
        imageUrl: '',
        healtStatus: 'Vacunado'
    });
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!form.name || !form.dogbreed || !form.color) {
            Alert.alert("Atención", "Nombre, Raza y Color son obligatorios");
            return;
        }

        setLoading(true);
        try {
            await registerPet(form);
            Alert.alert("¡Éxito!", "Mascota registrada correctamente", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return { form, setForm, loading, handleSave };
};