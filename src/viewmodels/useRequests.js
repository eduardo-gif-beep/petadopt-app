import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";

export const useRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const cargarSolicitudes = async () => {
        try {
            const data = await StorageService.getItem("requests");

            if (data && data.length > 0) {
                setRequests(data);
            } else {
                const mockRequests = [
                    {
                        id: "req_001",
                        status: "En Revisión",
                        motivo: "Tengo mucho espacio y amor para dar.",
                        pet: { name: "Rex", especie: "Perro" }
                    },
                    {
                        id: "req_002",
                        status: "Aprobada",
                        motivo: "Busco un compañero para mi gato.",
                        pet: { name: "Michi", especie: "Gato" }
                    }
                ];
                setRequests(mockRequests);
            }
        } catch (error) {
            console.log("Error cargando solicitudes:", error);
        }
    };

    return {
        requests,
        recargar: cargarSolicitudes
    };
};