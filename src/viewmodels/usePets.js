import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";

export const usePets = () => {
    const [pets, setPets] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const mockPets = [
            {
                id: "pet_001",
                name: "Rex",
                especie: "Perro (Golden)",
                age: "2 años",
                description: "Amigable y muy juguetón."
            },
            {
                id: "pet_002",
                name: "Michi",
                especie: "Gato",
                age: "6 meses",
                description: "Tranquilo, busca un hogar cálido."
            }
        ];

        setPets(mockPets);
        try {
            const userData = await StorageService.getItem("userData");
            if (userData) {
                setIsAdmin(userData.isAdmin);
            }
        } catch (error) {
            console.log("Error leyendo usuario:", error);
        }
    };

    return {
        pets,
        isAdmin
    };
};