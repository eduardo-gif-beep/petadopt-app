import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getUserProfile, sendAdoptionRequest } from "../services/AdoptionService";

export const useAdoptionRequest = (pet, navigation) => {
    const [motive, setMotive] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const profile = await getUserProfile();
                setUser(profile);
            } catch (e) {
                console.error("Error cargando perfil:", e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

const handleSend = async () => {
    if (motive.length < 10) {
        Alert.alert("Atención", "El motivo debe ser más descriptivo.");
        return;
    }

    setIsSubmitting(true);
    try {
        const payload = {
            petId: pet.id,
            motive: motive,
            ingresos: user.income, 
            tienePatio: user.haveyard 
        };

        const result = await sendAdoptionRequest(payload);
        
        Alert.alert("¡Éxito!", result.msg || "Solicitud enviada correctamente", [
            { text: "OK", onPress: () => navigation.navigate("Pets") }
        ]);
    } catch (e) {
  
        Alert.alert("Error al Enviar Solicitud", e.message); 
    } finally {
        setIsSubmitting(false);
    }
};

    return { motive, setMotive, user, loading, isSubmitting, handleSend };
};