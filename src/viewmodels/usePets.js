import { useState, useEffect } from "react";
import StorageService from "../helpers/StorageService";
import { getPetsService } from "../services/PetService";
import { jwtDecode } from "jwt-decode";

export const usePets = () => {
    const [pets, setPets] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const cargarDatosIniciales = async () => {
            try {
                const token = await StorageService.getToken('userToken');

                if (token) {
                    const decoded = jwtDecode(token);
                    setIsAdmin(decoded.user?.isAdmin || false);
                }
                const datosMascotas = await getPetsService();
                setPets(datosMascotas);


            } catch (error) {
                console.log("Error al inicializar Pantalla Pets:", error.message);
            } finally {
                setLoading(false);
            }
        };

        cargarDatosIniciales();
    }, []);

    return { pets, isAdmin, loading};
};