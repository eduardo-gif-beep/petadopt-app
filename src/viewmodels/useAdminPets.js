import { useState } from "react";

export const useAdminPets = () => {
    const [pets, setPets] = useState([
        {
            id: "101",
            name: "Rex",
            especie: "Dog",
            age: "2 años",
            description: "Amigable, vacunado y busca una familia activa."
        },
        {
            id: "102",
            name: "Michi",
            especie: "Gato",
            age: "5 meses",
            description: "Juguetón, ideal para departamentos."
        }
    ]);

    const cargarPets = () => {
        console.log("Recargando catálogo de administrador...");
    };

    return {
        pets,
        cargarPets
    };
};