import { useState, useEffect } from "react";
import StorageService from "../helpers/StorageService";
import { getPetsService, deletePetService } from "../services/PetService"; // Importar el nuevo servicio
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";

export const usePets = () => {
    const [pets, setPets] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    const refrescar = async () => {
        setLoading(true);
        try {
            const token = await StorageService.getToken('userToken');
            if (token) {
                const decoded = jwtDecode(token);
                setIsAdmin(decoded.user?.isAdmin || false);
            }
            const datosMascotas = await getPetsService();
            setPets(datosMascotas);
        } catch (error) {
            console.log("Error al refrescar Pantalla Pets:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const eliminarMascota = async (id) => {
        Alert.alert(
            "Eliminar Mascota",
            "¿Estás seguro de que deseas eliminar permanentemente esta mascota?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await deletePetService(id);
                            await refrescar();
                        } catch (error) {
                            Alert.alert("Error", error.msg || "No se pudo eliminar");
                        }
                    } 
                }
            ]
        );
    };

    useEffect(() => {
        refrescar();
    }, []);

    return { 
        pets, 
        isAdmin, 
        loading, 
        refrescar,
        eliminarMascota // <--- Exponemos la función
    };
};