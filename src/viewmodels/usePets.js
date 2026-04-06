import { useState, useEffect, useCallback } from "react"; // Añadimos useCallback
import StorageService from "../helpers/StorageService";
import { getPetsService } from "../services/PetService";
import { jwtDecode } from "jwt-decode";

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

    useEffect(() => {
        refrescar();
    }, []);

    return { 
        pets, 
        isAdmin, 
        loading, 
        refrescar
    };
};