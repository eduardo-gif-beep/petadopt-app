import { useState } from "react";

export const useAdminPets = () => {

    const [pets, setPets] = useState([
        { id: "1", name: "Rex" },
        { id: "2", name: "Michi" }
    ]);

    const deletePet = (id) => {
        const filtered = pets.filter(p => p.id !== id);
        setPets(filtered);
    };

    return {
        pets,
        deletePet
    };
};